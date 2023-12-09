import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Interceptors
import { ResponseInterceptor } from './interceptors/response.interceptor';

// Models
import { User, UserSchema } from './models/user.model';
import { Telephony, TelephonySchema } from './models/telephony.model';
import { Group, GroupSchema } from './models/group.model';
import { Task, TaskSchema } from './models/task.model';
import { Status, StatusSchema } from './models/status.model';

// Controllers
import { UserController } from './contollers/user.controller';
import { GroupController } from './contollers/group.controller';
import { TaskController } from './contollers/task.controller';
import { StatusController } from './contollers/status.controller';
import { TelephonyController } from './contollers/telephony.controller';

// Services
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { StatusService } from './services/status.service';
import { GroupService } from './services/group.service';
import { TelephonyService } from './services/telephony.service';

// Middlewares
import { AuthMiddleware } from './middleware/auth-guard.middleware';
import { AdminMiddleware } from './middleware/admin-guard.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Telephony.name, schema: TelephonySchema },
      { name: Group.name, schema: GroupSchema },
      { name: Task.name, schema: TaskSchema },
      { name: Status.name, schema: StatusSchema },
    ]),
  ],
  controllers: [
    UserController,
    GroupController,
    TaskController,
    StatusController,
    TelephonyController,
  ],
  providers: [
    UserService,
    GroupService,
    TaskService,
    StatusService,
    TelephonyService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users/login', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/fetch-user', method: RequestMethod.GET },
        { path: 'users/:userId/groups', method: RequestMethod.GET },
      )
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        { path: 'groups', method: RequestMethod.ALL },
        { path: 'tasks', method: RequestMethod.ALL },
        { path: 'telephony', method: RequestMethod.ALL },
        { path: 'status', method: RequestMethod.ALL },
      );
  }
}
