import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupActive, TaskSort } from '../models/group.model';
import { User } from '../models/user.model';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async createGroup(groupData: any): Promise<Group> {
    let newGroupId = 1;
    const lastGroup = await this.groupModel
      .findOne({}, {}, { sort: { groupId: -1 } })
      .select('groupId')
      .lean()
      .exec();

    if (lastGroup && lastGroup.groupId) {
      newGroupId = lastGroup.groupId + 1;
    }

    const defaultGroupData: Partial<Group> = {
      groupId: newGroupId,
      callback: {
        callTime: 0,
        callback: 0,
        callbackAttempt: 0,
        postProcessing: 0,
        busy: 0,
        notAvailable: 0,
        noCall: 0,
        interrupted: 0,
      },
      dayTime: {
        Monday: { with: null, on: null },
        Tuesday: { with: null, on: null },
        Wednesday: { with: null, on: null },
        Thursday: { with: null, on: null },
        Friday: { with: null, on: null },
        Saturday: { with: null, on: null },
        Sunday: { with: null, on: null },
      },
      schedule: null,
    };

    const groupWithDefaultData = { ...defaultGroupData, ...groupData };

    const createdGroup = new this.groupModel(groupWithDefaultData);
    return createdGroup.save();
  }

  async updateGroupTelephony(
    groupId: string,
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
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (updateData.sortBy === TaskSort.NEWEST) {
      group.tasks.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime());
    } else if (updateData.sortBy === TaskSort.OLDEST) {
      group.tasks.sort((a, b) => a.createdOn.getTime() - b.createdOn.getTime());
    }

    group.line = updateData.line;
    group.name = updateData.name;

    if (updateData.dayTime) {
      group.dayTime = updateData.dayTime;
    }

    return group.save();
  }

  async deleteGroup(groupId: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(groupId);
  }

  async getGroups(type: GroupActive = GroupActive.ALL): Promise<Group[]> {
    return await this.groupModel
      .find(type === 'all' ? {} : { active: type })
      .exec();
  }

  async getGroupById(groupId: string): Promise<Group> {
    return this.groupModel.findById(groupId).exec();
  }

  async updateGroupActiveStatus(
    groupId: string,
    active: boolean,
  ): Promise<Group> {
    console.log(groupId, active);
    return this.groupModel.findByIdAndUpdate(groupId, {
      active: active ? GroupActive.ACTIVE : GroupActive.INACTIVE,
    });
  }

  async removeUserFromGroup(groupId: string, userId: string): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(groupId, {
      $pull: { users: userId },
    });
  }

  async getAllUsersInGroup(groupId: string): Promise<User[]> {
    const group = await this.groupModel
      .findById(groupId)
      .select('users')
      .populate('users');

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group.users as unknown as User[];
  }

  async addUsersToGroup(groupId: string, usersToAdd: string[]): Promise<Group> {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    return this.groupModel
      .findByIdAndUpdate(
        groupId,
        {
          $addToSet: {
            users: {
              $each: usersToAdd,
            },
          },
        },
        { new: true },
      )
      .exec();
  }
}
