import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

interface DecodedToken {
  isActive: boolean;
  role?: string;
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization?.split(' ')[1];
    const cookieToken = req.cookies?.['Authorization']?.split(' ')[1];
    const token = headerToken || cookieToken;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    let insufficientPrivileges = false;

    try {
      const decodedToken = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      ) as DecodedToken;

      if (decodedToken.role !== 'ADMIN' || !decodedToken.isActive) {
        insufficientPrivileges = true;
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    if (insufficientPrivileges) {
      throw new UnauthorizedException('Insufficient privileges');
    }

    next();
  }
}
