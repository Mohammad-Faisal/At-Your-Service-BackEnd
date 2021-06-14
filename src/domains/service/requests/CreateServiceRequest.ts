import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ServiceType } from '../entities/Service';
import { BaseRequest } from '../../../models/BaseRequest';

export class CreateServiceRequest extends BaseRequest {


    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    description: string;

    @ApiModelProperty()
    @IsNotEmpty()
    hourlyRate: number;

    @ApiModelProperty()
    @IsNotEmpty()
    preferredHour: string;

    @ApiModelProperty()
    @IsNotEmpty()
    type: ServiceType;
}
