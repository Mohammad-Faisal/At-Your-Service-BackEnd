import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserType } from '../entities/User';

export class SignUpRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    type: UserType;

    @ApiModelProperty()
    @MinLength(6)
    @MaxLength(15)
    @IsNotEmpty()
    password: string;
}
