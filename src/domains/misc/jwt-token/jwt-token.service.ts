import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserType } from '../../user/entities/User';

@Injectable()
export class JwtTokenService {


  jwt = require('jsonwebtoken');

  constructor(private configService: ConfigService) {}

  generateToken = (userName: string , userId: number , userType: UserType) => {

    const payload = {
      userName:userName,
      userId: userId,
      userType: userType,
    };

    return this.jwt.sign(payload, this.configService.get('JWT_SECRET'));
  };

  verifyToken = (token: string) => {
    return this.jwt.verify(token, this.configService.get('JWT_SECRET'));
  };

}
