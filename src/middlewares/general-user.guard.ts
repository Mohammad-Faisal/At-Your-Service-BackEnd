import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import CommonException from '../models/CommonException';
import { UserType } from '../domains/user/entities/User';
import ErrorCodes from '../utils/ErrorCodes';

@Injectable()
export class GeneralUserGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userType = request.body.userType;
        if (userType !== UserType.GENERAL_USER) throw new CommonException(ErrorCodes.UNAUTHORIZED_ACCESS);
        return true;
    }
}
