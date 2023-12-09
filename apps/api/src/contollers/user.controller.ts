import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, EditUserDto, LoginUserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put('edit')
  async editUser(
    @Query('id') id: string,
    @Body() editUserDto: EditUserDto,
  ): Promise<User> {
    return await this.userService.editUser(id, editUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string; user: User }> {
    return this.userService.login(loginUserDto);
  }

  @Put('change-active')
  async activateDeactivateUser(
    @Query('id') userId: string,
    @Body('isActive') newState: boolean,
  ): Promise<User> {
    return this.userService.activateDeactivateUser(userId, newState);
  }
  @Get('get')
  async get(): Promise<User[]> {
    return this.userService.get();
  }
  @Get('fetch-user')
  async fetchUser(@Request() req: any): Promise<User> {
    const { sub } = req.user;

    return this.userService.fetch(sub);
  }
  @Delete('delete')
  async deleteUser(@Query('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @Get('get-by-id')
  async getUserById(@Query('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post('add-user-to-groups')
  async addGroupsToUser(
    @Query('userId') userId: string,
    @Body() groupsData: [string],
  ) {
    return this.userService.addGroupsToUser(userId, groupsData);
  }

  @Get('get-user-groups')
  async getAllGroupsAndUsersByUserId(@Query('id') userId: string) {
    return this.userService.getAllGroupsAndUsersByUserId(userId);
  }
}
