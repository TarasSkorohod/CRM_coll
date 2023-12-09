import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, EditUserDto } from '../dtos/user.dto';
import { Group } from '../models/group.model';
import { Status } from '../models/status.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
    private configService: ConfigService,
  ) {}

  async login(loginDto: any): Promise<{ token: string; user: User }> {
    const { usernameOrEmail, password } = loginDto;

    const user = await this.userModel
      .findOne()
      .or([{ fullName: usernameOrEmail }, { email: usernameOrEmail }])
      .select('username role password isActive');

    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      !user.isActive
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    user.isOnline = true;
    await user.save();

    const payload = { sub: user._id, role: user.role, isActive: user.isActive };
    const token = jwt.sign(
      payload,
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: '7d' },
    );

    return { token, user };
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role, fullName } = createUserDto;
    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser)
      throw new ConflictException('User with this email already exists');

    if (!password || typeof password !== 'string')
      throw new BadRequestException('Invalid password');

    if (password.length < 6)
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultStatus = await this.statusModel
      .findOne({
        name: 'Відпочиваю',
      })
      .select('');

    const createdUser = new this.userModel({
      email,
      role,
      fullName,
      password: hashedPassword,
      status: defaultStatus._id,
    });

    try {
      return await createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create user: ${error.message}`,
      );
    }
  }

  async editUser(_id: string, newData: EditUserDto): Promise<User> {
    const existingUser = await this.userModel.findById(_id).exec();

    if (!existingUser) throw new NotFoundException('User not found');

    if (newData.email) existingUser.email = newData.email;

    if (newData.role) existingUser.role = newData.role;

    if (newData.fullName) existingUser.fullName = newData.fullName;

    if (newData.password)
      existingUser.password = await bcrypt.hash(newData.password, 10);

    return existingUser.save();
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndRemove(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async get(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('telephony.telephonyId')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async fetch(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async activateDeactivateUser(_id: string, newState: boolean): Promise<User> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) throw new NotFoundException('User not found');
    user.isActive = newState;
    return user.save();
  }

  async addGroupsToUser(userId: string, groupsData: string[]): Promise<void> {
    await this.groupModel.updateMany({}, { $pull: { users: userId } });

    await this.groupModel.updateMany(
      { _id: { $in: groupsData } },
      { $addToSet: { users: userId } },
    );
  }

  async getAllGroupsAndUsersByUserId(userId: string): Promise<Group[]> {
    return this.groupModel.find({ users: userId }).exec();
  }
}
