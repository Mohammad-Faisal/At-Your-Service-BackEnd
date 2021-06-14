import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../models/BaseRequest';
import { OrderStatus } from '../entities/Order';
import { UserType } from '../../user/entities/User';


export class GetOrdersRequest extends BaseRequest {
    @ApiModelProperty()
    status: OrderStatus;

}
