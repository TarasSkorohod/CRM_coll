import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../dtos/group.dto';
import { Group } from '../models/group.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async getTaskById(taskId: string): Promise<Task> {
    return this.taskModel.findById(taskId).exec();
  }

  async updateTask(
    taskId: string,
    updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(taskId, updateTaskDto).exec();
  }

  async deleteTask(taskId: string): Promise<Task | null> {
    const deletedTask = await this.taskModel.findByIdAndRemove(taskId).exec();
    if (!deletedTask) {
      return null;
    }
    const groupsContainingTask = await this.groupModel
      .find({
        'tasks._id': deletedTask._id,
      })
      .exec();

    for (const group of groupsContainingTask) {
      const taskIndex = group.tasks.findIndex((t) =>
        t._id.equals(deletedTask._id),
      );
      if (taskIndex !== -1) {
        group.tasks.splice(taskIndex, 1);
        await group.save();
      }
    }

    return deletedTask;
  }
  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
  async addTaskToGroup(taskId: string, groupId: string): Promise<Group> {
    const task = await this.taskModel.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');

    const updatedGroup = await this.groupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { tasks: task } },
      { new: true, runValidators: true },
    );

    if (!updatedGroup) throw new NotFoundException('Group not found');

    return updatedGroup;
  }
}
