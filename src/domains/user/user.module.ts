import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserCredentialRepository } from './repositories/user.credential.repository';
import { JwtTokenModule } from '../misc/jwt-token/jwt-token.module';

@Module({
    imports: [
      JwtTokenModule,
      TypeOrmModule.forFeature([UserRepository , UserCredentialRepository ])
    ],
    controllers: [UserController],
    providers: [UserService ],
    exports : [UserService]

})

export class UserModule {

}
