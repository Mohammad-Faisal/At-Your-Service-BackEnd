import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ServiceType } from '../entities/Service';
import { BaseRequest } from '../../../models/BaseRequest';

export class GetFilteredServicesRequest extends BaseRequest {
    @ApiModelProperty({ default: 0 })
    minRating: number = 0;

    @ApiModelProperty({ default: 5.0 })
    maxRating: number = 5.0;

    @ApiModelProperty({ default: 0 })
    minRate: number = 0;

    @ApiModelProperty({ default: 9999999 })
    maxRate: number = 9999999;

    @ApiModelProperty()
    type: ServiceType;
}
