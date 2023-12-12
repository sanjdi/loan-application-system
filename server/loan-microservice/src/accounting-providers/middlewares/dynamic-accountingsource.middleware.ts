import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DynamicAccountingsourceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract the value from the client request and set it in a shared location
    req['accProviderId'] = req.headers['accounting-provider-id'];

    next();
  }
}