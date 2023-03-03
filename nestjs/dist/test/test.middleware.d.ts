import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class TestMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    next(): any;
    if(: any, user: any): void;
}
