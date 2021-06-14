import { UserType } from '../../user/entities/User';

export class JwtPayload {

    userName: string;
    userId: number;
    userType: UserType;

}
