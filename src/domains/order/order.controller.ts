import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { SuccessResponse } from '../../models/SuccessResponse';
import { OrderService } from './order.service';
import { PlaceOrderRequest } from './requests/PlaceOrderRequest';
import { GiveReviewRequest } from './requests/GiveReviewRequest';
import { ChangeOrderStatusRequest } from './requests/ChangeOrderStatusRequest';
import { GetOrdersRequest } from './requests/GetOrdersRequest';
import { BaseRequest } from '../../models/BaseRequest';
import { SuperAdminGuard } from '../../middlewares/super-admin.guard';
import { GeneralUserGuard } from '../../middlewares/general-user.guard';
import { ServiceProviderGuard } from '../../middlewares/service-provider.guard';

@Controller('order')
@ApiTags('Order')
@ApiHeader({ name: 'authtoken' })
export class OrderController {
    constructor(private orderService: OrderService) {}

    @UseGuards(ServiceProviderGuard)
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

    @UseGuards(GeneralUserGuard)
    @Post('give-review')
    async giveReview(@Body() request: GiveReviewRequest, @Res() response) {
        const result = await this.orderService.giveReview(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @UseGuards(SuperAdminGuard)
    @Post('get-reviews')
    async getReviews(@Body() request: BaseRequest, @Res() response) {
        const result = await this.orderService.getReviews();
        response.json(new SuccessResponse(result.getValue()));
    }
}
