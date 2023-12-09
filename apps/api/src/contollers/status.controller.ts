import {
  Controller,
  Post,
  Put,
  Body,
  Query,
  Delete,
  Get,
} from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { Status } from '../models/status.model';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('get-all')
  async getAll(): Promise<Status[]> {
    return this.statusService.getAllStatuses();
  }
  @Get('get-by-id')
  async getById(@Query('id') id: string): Promise<Status> {
    return this.statusService.getStatusById(id);
  }
  @Post('create')
  async createCustomStatus(
    @Body('name') name: string,
    @Body('color') color: string,
  ): Promise<Status> {
    return this.statusService.createCustomStatus(name, color);
  }
  @Put('update')
  async updateStatus(
    @Query('id') id: string,
    @Body() { name, color }: { name: string; color: string },
  ): Promise<Status> {
    return this.statusService.updateStatus(id, name, color);
  }

  @Delete('delete')
  async deleteStatus(@Query('id') id: string): Promise<Status> {
    return this.statusService.deleteStatus(id);
  }
}
