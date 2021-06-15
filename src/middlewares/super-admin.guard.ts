import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { getRepository } from 'typeorm';
import CommonException from '../models/CommonException';
import { UserType } from '../domains/user/entities/User';
import ErrorCodes from '../utils/ErrorCodes';

@Injectable()
export class SuperAdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userType = request.body.userType;
        if (userType !== UserType.SUPER_ADMIN) throw new CommonException(ErrorCodes.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
        return true;
    }
}
