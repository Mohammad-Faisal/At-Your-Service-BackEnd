import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtTokenService } from '../domains/misc/jwt-token/jwt-token.service';
import { JwtPayload } from '../domains/misc/jwt-token/JwtPayload';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(private jwtTokenService: JwtTokenService) {}

    async use(req: Request, res: Response, next: Function) {
        const authToken: string | string[] = req.headers.authorization;
        const jwtToken = authToken.split(' ')[1];

        const verifiedToken: JwtPayload = this.jwtTokenService.verifyToken(jwtToken as string);

        if (req.body) {
            req.body.userId = verifiedToken.userId;
            req.body.userType = verifiedToken.userType;
            req.body.userName = verifiedToken.userName;
        }

        next();
    }
}
