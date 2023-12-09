import { UserRole } from '../models/user.model';
export interface SimpleUser {
  _id: string;
  fullName: string;
  isWorking: boolean;
}
export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly fullName: string;
  readonly inputLine?: boolean;
  readonly telephony?: {
    id: string;
    name: string;
    phones: string[];
    telephonyData: CreateTelephonyDto;
  }[];
  readonly isActive: boolean;
  readonly isInactive: boolean;
  // readonly status?: UserStatus;
  readonly isOnline: boolean = true;
}

export class EditUserDto {
  readonly email?: string;
  readonly role?: UserRole;
  readonly password?: string;
  readonly fullName?: string;
  // readonly status?: UserStatus;
}

export class CreateTelephonyDto {
  readonly name: string;
  readonly sipInternalNumber?: string;
  readonly sipServer?: string;
  readonly login?: string;
  readonly password?: string;
}

export class EditTelephonyDto {
  readonly password?: string;
  readonly name: string;
}

export class LoginUserDto {
  readonly usernameOrEmail: string;
  readonly password: string;
}

export class UpdateTelephonyDto {
  name?: string;
  sipInternalNumber?: string;
  sipServer?: string;
  login?: string;
  password?: string;
  inputLine?: boolean;
}

export class UpdatedUser {
  _id: string;
  isWorking: boolean;
}
