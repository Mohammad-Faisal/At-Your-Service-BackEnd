import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../models/BaseRequest';
import { OrderStatus } from '../entities/Order';

export class ChangeOrderStatusRequest extends BaseRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    orderId: number;

    @ApiModelProperty()
    @IsNotEmpty()
    changedStatus: OrderStatus;

    @ApiModelProperty()
    reason: string;
}
