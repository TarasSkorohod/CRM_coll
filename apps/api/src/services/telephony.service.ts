import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTelephonyDto, UpdateTelephonyDto } from '../dtos/user.dto';
import { Telephony } from '../models/telephony.model';
import { User } from '../models/user.model';

@Injectable()
export class TelephonyService {
  constructor(
    @InjectModel(Telephony.name) private telephonyModel: Model<Telephony>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createTelephony(
    createTelephonyDto: CreateTelephonyDto,
  ): Promise<Telephony> {
    try {
      const telephony = new this.telephonyModel(createTelephonyDto);
      await telephony.save();

      return telephony;
    } catch (error) {
      console.error('Error creating telephony:', error);
      throw error;
    }
  }

  async updateTelephonyById(
    telephonyId: string,
    updatedTelephony: UpdateTelephonyDto,
  ): Promise<Telephony> {
    return this.telephonyModel.findByIdAndUpdate(telephonyId, updatedTelephony);
  }

  async getTelephonyById(telephonyId: string): Promise<Telephony | null> {
    const telephony = await this.telephonyModel.findById(telephonyId).exec();

    if (!telephony) throw new NotFoundException('Telephony not found');

    return telephony;
  }

  async deleteTelephonyById(telephonyId: string): Promise<void> {
    const telephony = await this.telephonyModel
      .findByIdAndDelete(telephonyId)
      .exec();

    if (!telephony) {
      throw new NotFoundException('Telephony not found');
    }

    const users = await this.userModel
      .find({ 'telephony.telephonyId': telephonyId })
      .select('telephony');

    for (const user of users) {
      const index = user.telephony.findIndex(
        (t) => t.telephonyId.toString() === telephonyId,
      );

      if (index !== -1) {
        user.telephony.splice(index, 1);
        await user.save();
      }
    }
  }

  async getAllTelephony(): Promise<Telephony[]> {
    try {
      return await this.telephonyModel.find().exec();
    } catch (error) {
      console.error('Error get telephony:', error);
      throw error;
    }
  }

  async addTelephonyToUser(userId: string, telephonyId: string): Promise<User> {
    const user = await this.userModel.findById(userId).select('telephony');
    if (!user) throw new NotFoundException('User not found');

    const telephony = await this.telephonyModel.findById(telephonyId).exec();
    if (!telephony) throw new NotFoundException('Telephony not found');

    // Перевірка на наявність вже доданої телефонії
    const isTelephonyAdded = user.telephony.some(
      ({ telephonyId: id }) => id.toString() === telephonyId,
    );
    if (isTelephonyAdded)
      throw new ConflictException(
        'This telephony has already been added to the user',
      );

    user.telephony.push({
      telephonyId: new Types.ObjectId(telephonyId),
      inputLine: telephony.inputLine,
    });

    await user.save();
    return this.userModel
      .findById(userId)
      .select('telephony')
      .populate('telephony.telephonyId');
  }

  async changeUserInputLine(
    userId: string,
    telephonyId: string,
    inputLine: boolean,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).select('telephony');
    if (!user) throw new NotFoundException('User not found');

    const telephony = user.telephony.find(
      (t) => t.telephonyId.toString() === telephonyId,
    );
    if (!telephony) throw new NotFoundException('Telephony not found');

    telephony.inputLine = inputLine;

    return user.save();
  }

  async removeTelephonyFromUser(
    userId: string,
    telephonyId: string,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');

    const telephonyIndex = user.telephony.findIndex(
      (t) => t.telephonyId.toString() === telephonyId,
    );
    if (telephonyIndex === -1) {
      throw new NotFoundException('Telephony not found');
    }
    user.telephony.splice(telephonyIndex, 1);

    return user.save();
  }

  async updateInputLine(id: string, inputLine: boolean): Promise<Telephony> {
    return this.telephonyModel.findByIdAndUpdate(id, { inputLine });
  }
}
