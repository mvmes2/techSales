import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { removeRandomCharsFromToken } from '@helpers/overshadowedToken';

@Injectable()
export class DeobfuscateTokenMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers['authorization'];
      console.log(`Original Authorization Header: ${authorizationHeader}`);

      if (authorizationHeader) {
        const [type, token] = authorizationHeader.split(' ');

        if (type === 'Bearer' && token) {
          const deobfuscatedToken = removeRandomCharsFromToken(token);
          req.headers['authorization'] = `Bearer ${deobfuscatedToken}`;
          console.log(`Deobfuscated Token: ${deobfuscatedToken}`);
        }
      }
    } catch (error) {
      console.error(`Error in DeobfuscateTokenMiddleware: ${error.message}`);
    }

    next();
  }
}
