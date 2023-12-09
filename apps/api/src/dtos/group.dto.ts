import { GroupStatus } from '../models/group.model';

export class CreateGroupDto {
  name: string;
  status?: GroupStatus;
  canDelete?: boolean;
  priority?: number;
  tasks?: string[];
  callback?: {
    callTime?: number;
    callback?: number;
    callbackAttempt?: number;
    postProcessing?: number;
    busy?: number;
    notAvailable?: number;
    noCall?: number;
    interrupted?: number;
  };
  users?: string[];
  webhookLink?: string;
  dayTime?: {
    Monday?: { with?: string; on?: string };
    Tuesday?: { with?: string; on?: string };
    Wednesday?: { with?: string; on?: string };
    Thursday?: { with?: string; on?: string };
    Friday?: { with?: string; on?: string };
    Saturday?: { with?: string; on?: string };
    Sunday?: { with?: string; on?: string };
  };
  timeSettings?: {
    // Додайте поля для налаштувань часу тут
  };

  constructor(partial: Partial<CreateGroupDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateGroupDto {
  name?: string;
  status?: GroupStatus;
  canDelete?: boolean;
  priority?: number;
  tasks?: string[];
  callback?: {
    callTime?: number;
    callback?: number;
    callbackAttempt?: number;
    postProcessing?: number;
    busy?: number;
    notAvailable?: number;
    noCall?: number;
    interrupted?: number;
  };
  users?: string[];
  webhookLink?: string;

  constructor(partial: Partial<UpdateGroupDto>) {
    Object.assign(this, partial);
  }
}

export class GroupTileDto {
  name: string;
  groupId: string;
  status: string;
  onlineOperators: string[];
  schedule: string;
  totalTasks: number;
  overdueTasks: number;
  queuedTasks: number;
}

export class AttachOperatorsDto {
  users: string[];
}

export class TaskDto {
  orderCRM: string;
  order: string;
  number: string;
  callTime: number | null;
  createdOn: Date;
}

// DTO для створення/оновлення задачі
export class CreateTaskDto extends TaskDto {}
export interface UpdateDayTimeDto {
  Monday?: { with?: string; on?: string };
  Tuesday?: { with?: string; on?: string };
  Wednesday?: { with?: string; on?: string };
  Thursday?: { with?: string; on?: string };
  Friday?: { with?: string; on?: string };
  Saturday?: { with?: string; on?: string };
  Sunday?: { with?: string; on?: string };
}
