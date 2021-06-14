import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../models/BaseRequest';

export class PlaceOrderRequest extends BaseRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    serviceId: number;
}
