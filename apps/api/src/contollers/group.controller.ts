import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Group, GroupActive, TaskSort } from '../models/group.model';
import { CreateGroupDto } from '../dtos/group.dto';
import { GroupService } from '../services/group.service';
import { User } from '../models/user.model';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(createGroupDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string): Promise<Group> {
    return this.groupService.deleteGroup(id);
  }

  @Put('update')
  async updateGroupTelephony(
    @Query('id') groupId: string,
    @Body()
    updateData: {
      sortBy: TaskSort;
      line: string;
      name: string;
      dayTime: {
        Monday: { with: ''; on: '' };
        Tuesday: { with: ''; on: '' };
        Wednesday: { with: ''; on: '' };
        Thursday: { with: ''; on: '' };
        Friday: { with: ''; on: '' };
        Saturday: { with: ''; on: '' };
        Sunday: { with: ''; on: '' };
      };
    },
  ): Promise<Group> {
    return this.groupService.updateGroupTelephony(groupId, updateData);
  }

  @Get('get-all')
  async getGroups(@Query('type') type: GroupActive): Promise<Group[]> {
    return await this.groupService.getGroups(type);
  }

  @Get('get-by-id')
  findOne(@Query('id') id: string): Promise<Group> {
    return this.groupService.getGroupById(id);
  }

  @Post('change-active')
  async updateGroupActiveStatus(
    @Query('id') groupId: string,
    @Body() data: { active: string },
  ) {
    return this.groupService.updateGroupActiveStatus(
      groupId,
      data.active === 'true',
    );
  }

  @Delete('delete-user')
  async removeUserFromGroup(
    @Query('groupId') groupId: string,
    @Query('userId') userId: string,
  ) {
    return this.groupService.removeUserFromGroup(groupId, userId);
  }

  @Get('get-users')
  async getAllUsersInGroup(@Query('id') id: string): Promise<User[]> {
    return this.groupService.getAllUsersInGroup(id);
  }

  @Post('add-users')
  async addUsersToGroup(
    @Query('id') id: string,
    @Body() usersToAdd: [string],
  ): Promise<Group> {
    return this.groupService.addUsersToGroup(id, usersToAdd);
  }
}
