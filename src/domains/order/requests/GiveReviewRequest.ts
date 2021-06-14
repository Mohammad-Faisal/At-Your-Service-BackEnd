import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../models/BaseRequest';

export class GiveReviewRequest extends BaseRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    orderId: number;

    @ApiModelProperty()
    @IsNotEmpty()
    rating: number;

    @ApiModelProperty()
    review: string;
}
