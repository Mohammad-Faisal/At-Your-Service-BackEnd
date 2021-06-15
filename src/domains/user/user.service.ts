import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/User';
import { UserRepository } from './repositories/user.repository';
import { Result } from '../../models/Result';
import { SignUpRequest } from './requests/SignUpRequest';
import { UsersAuthenticationResponse } from './responses/UsersAuthenticationResponse';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { SignInRequest } from './requests/SignInRequest';
import { UserCredential } from './entities/UserCredential';
import { UserCredentialRepository } from './repositories/user.credential.repository';
import { JwtTokenService } from '../misc/jwt-token/jwt-token.service';
import { GetUsersRequest } from './requests/GetUsersRequest';

import bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        private readonly jwtTokenService: JwtTokenService,
        private readonly userRepository: UserRepository,
        private readonly userCredentialRepository: UserCredentialRepository,
    ) {}

    async getUsers(request: GetUsersRequest): Promise<Result> {
        const users = await this.userRepository.find({
            where: {
                userType: request.typeOfUser,
            },
        });
        return Result.success(users);
    }
    async signUp(request: SignUpRequest): Promise<Result> {
        await this.checkIfUserAlreadyExists(request);
        const user = await this.saveUser(request);
        await this.saveUserCredential(user, request);
        const jwtToken = this.generateToken(user);
        const userAuthenticationResponse = new UsersAuthenticationResponse(user, jwtToken);

        return Result.success(userAuthenticationResponse);
    }

    private async checkIfUserAlreadyExists(request: SignUpRequest) {
        const oldUser = await this.userRepository.findOne({
            where: {
                email: request.email,
            },
        });
        if (oldUser) throw new CommonException(ErrorCodes.USER_ALREADY_EXISTS, HttpStatus.AMBIGUOUS);
    }

    async signIn(request: SignInRequest): Promise<Result> {
        const userCredential = await this.getUserCredentialFromId(request);
        const user = await this.userRepository.findOne(userCredential.userId);
        const jwtToken = this.generateToken(user);
        const userAuthenticationResponse = new UsersAuthenticationResponse(user, jwtToken);

        return Result.success(userAuthenticationResponse);
    }

    private async getUserCredentialFromId(request: SignInRequest) {
        const hashedPassword = await this.getHashedPassword(request.password);
        const userCredential = await this.userCredentialRepository.findOne({
            where: {
                email: request.email,
                password: hashedPassword,
            },
        });

        if (!userCredential) throw new CommonException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        return userCredential;
    }

    getHashedPassword = async password => {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    };

    generateToken = (user: User): string => {
        return this.jwtTokenService.generateToken(user.name, user.id, user.userType);
    };

    private async saveUser(request: SignUpRequest) {
        const userModel = new User();
        userModel.name = request.name;
        userModel.email = request.email;
        userModel.userType = request.type;
        return await this.userRepository.save(userModel);
    }

    private async saveUserCredential(user: User, request: SignUpRequest) {
        const userCredentialModel = new UserCredential();
        const hashedPassword = await this.getHashedPassword(request.password);
        userCredentialModel.userId = user.id;
        userCredentialModel.email = request.email;
        userCredentialModel.password = hashedPassword;
        await this.userCredentialRepository.save(userCredentialModel);
    }
}
