import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequest } from './requests/SignUpRequest';
import { SuccessResponse } from '../../models/SuccessResponse';
import { ApiTags } from '@nestjs/swagger';
import { SignInRequest } from './requests/SignInRequest';
import { GetUsersRequest } from './requests/GetUsersRequest';
import { SuperAdminGuard } from '../../middlewares/super-admin.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    async signUp(@Body() request: SignUpRequest, @Res() response) {
        const result = await this.userService.signUp(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('signin')
    async signIn(@Body() request: SignInRequest, @Res() response) {
        const result = await this.userService.signIn(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @UseGuards(SuperAdminGuard)
    @Post('users')
    async getUsers(@Body() request: GetUsersRequest, @Res() response) {
        const result = await this.userService.getUsers(request);
        response.json(new SuccessResponse(result.getValue()));
    }
}
