import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction , Request, Response} from 'express';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if(authHeaders && (authHeaders as string).split('')[1]) {
      const token = (authHeaders as string).split('')[1];
      const decoded: any = jwt.verify(token, 'SECRET');
      const user = await this.userService.findById(decoded.id);
      }
    }
    next();
    if (!user) {
      throw new HttpException('User not found');
    }
  }
}
