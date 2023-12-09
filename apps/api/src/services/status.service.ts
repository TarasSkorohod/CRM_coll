import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from '../models/status.model';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<Status>) {}

  async getStatusById(id: string): Promise<Status> {
    return this.statusModel.findById(id);
  }
  async getAllStatuses(): Promise<Status[]> {
    return this.statusModel.find();
  }
  async createCustomStatus(name: string, color: string): Promise<Status> {
    const newStatus = new this.statusModel({
      name,
      color,
    });

    return newStatus.save();
  }
  async updateStatus(id: string, name: string, color: string): Promise<Status> {
    const statusToUpdate = await this.statusModel
      .findById(id)
      .select('editable name color');
    if (!statusToUpdate) throw new NotFoundException('Status not found');
    if (!statusToUpdate.editable && name)
      throw new ForbiddenException(
        'Editing name of this status is not allowed',
      );

    if (name) statusToUpdate.name = name;
    if (color) statusToUpdate.color = color;

    return statusToUpdate.save();
  }

  async deleteStatus(id: string): Promise<Status> {
    const statusToDelete = await this.statusModel
      .findById(id)
      .select('editable');
    if (!statusToDelete) throw new NotFoundException('Status not found');
    if (!statusToDelete.editable)
      throw new ForbiddenException('Deletion is not allowed');

    return this.statusModel.findByIdAndDelete({ _id: id });
  }
}
