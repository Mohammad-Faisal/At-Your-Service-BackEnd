import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { SuccessResponse } from '../../models/SuccessResponse';
import { OrderService } from './order.service';
import { PlaceOrderRequest } from './requests/PlaceOrderRequest';
import { GiveReviewRequest } from './requests/GiveReviewRequest';
import { ChangeOrderStatusRequest } from './requests/ChangeOrderStatusRequest';
import { GetOrdersRequest } from './requests/GetOrdersRequest';

@Controller('order')
@ApiTags('Order')
@ApiHeader({ name: 'authtoken' })
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('place-order')
    async createNewService(@Body() request: PlaceOrderRequest, @Res() response) {
        const result = await this.orderService.placeOrder(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('get-orders')
    async getOrders(@Body() request: GetOrdersRequest, @Res() response) {
        const result = await this.orderService.getOrders(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('change-order-status')
    async changeOrderStatus(@Body() request: ChangeOrderStatusRequest, @Res() response) {
        const result = await this.orderService.changeOrderStatus(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('give-review')
    async giveReview(@Body() request: GiveReviewRequest, @Res() response) {
        const result = await this.orderService.giveReview(request);
        response.json(new SuccessResponse(result.getValue()));
    }
}
