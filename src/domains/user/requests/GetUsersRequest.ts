import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserType } from '../entities/User';

export class GetUsersRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    typeOfUser: UserType;
}
