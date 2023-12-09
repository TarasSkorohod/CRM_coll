import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { CreateTaskDto } from '../dtos/group.dto';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('get-by-id')
  async findOne(@Query('id') taskId: string): Promise<Task | null> {
    return this.taskService.getTaskById(taskId);
  }

  @Put('update')
  async update(
    @Query('id') taskId: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Delete('delete')
  async remove(@Query('id') taskId: string): Promise<Task | null> {
    return this.taskService.deleteTask(taskId);
  }
  @Get('get-all')
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
  @Post('add-to-group')
  async addTaskToGroup(
    @Body() { taskId, groupId }: { taskId: string; groupId: string },
  ) {
    return this.taskService.addTaskToGroup(taskId, groupId);
  }
}
