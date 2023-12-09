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
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization?.split(' ')[1];
    const cookieToken = req.cookies?.['Authorization']?.split(' ')[1];

    const token = headerToken || cookieToken;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const user = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      ) as DecodedToken;

      if (user && user.isActive) {
        res.locals.user = user;
        (req as any).user = res.locals.user;
        (req as any).token = token;

        next();
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
