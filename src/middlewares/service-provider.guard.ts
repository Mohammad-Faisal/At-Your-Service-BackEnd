import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import CommonException from '../models/CommonException';
import { UserType } from '../domains/user/entities/User';
import ErrorCodes from '../utils/ErrorCodes';

@Injectable()
export class ServiceProviderGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userType = request.body.userType;
        if (userType !== UserType.SERVICE_PROVIDER) throw new CommonException(ErrorCodes.UNAUTHORIZED_ACCESS);
        return true;
    }
}
