import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TelephonyService } from '../services/telephony.service';
import { CreateTelephonyDto, UpdateTelephonyDto } from '../dtos/user.dto';
import { User } from '../models/user.model';

@Controller('telephony')
export class TelephonyController {
  constructor(private readonly telephonyService: TelephonyService) {}

  @Post('create')
  async createTelephony(@Body() createTelephonyDto: CreateTelephonyDto) {
    return await this.telephonyService.createTelephony(createTelephonyDto);
  }

  @Put('update')
  async updateTelephonyById(
    @Query('id') telephonyId: string,
    @Body() updateTelephonyDto: UpdateTelephonyDto,
  ) {
    return this.telephonyService.updateTelephonyById(
      telephonyId,
      updateTelephonyDto,
    );
  }

  @Get('get')
  async getTelephonyById(@Query('id') id: string) {
    return await this.telephonyService.getTelephonyById(id);
  }

  @Get('get-all')
  async getAllTelephony() {
    return this.telephonyService.getAllTelephony();
  }

  @Delete('delete')
  async deleteTelephonyById(@Query('id') id: string) {
    return this.telephonyService.deleteTelephonyById(id);
  }

  @Post('add-to-user')
  async addTelephonyToUser(
    @Body() data: { telephonyId: string; userId: string },
  ): Promise<User> {
    return this.telephonyService.addTelephonyToUser(
      data.userId,
      data.telephonyId,
    );
  }

  @Post('/users/changeInputLine')
  async updateTelephonyStatus(
    @Body() data: { telephonyId: string; userId: string; inputLine: boolean },
  ): Promise<User> {
    return this.telephonyService.changeUserInputLine(
      data.userId,
      data.telephonyId,
      data.inputLine,
    );
  }

  @Delete('delete-from-users')
  async removeTelephonyFromUser(
    @Query('userId') userId: string,
    @Query('telephonyId') telephonyId: string,
  ): Promise<User> {
    return this.telephonyService.removeTelephonyFromUser(userId, telephonyId);
  }

  @Put('update-input-line')
  async updateTelephonySelectedStatus(
    @Query('id') id: string,
    @Body() updateData: { inputLine: boolean },
  ) {
    return this.telephonyService.updateInputLine(id, updateData.inputLine);
  }
}
