import { NestMiddleware } from '@nestjs/common';
export declare class QqqMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
