import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceRepository } from '../service/repositories/service.repository';
import { Result } from '../../models/Result';
import { Order, OrderStatus } from './entities/Order';
import { PlaceOrderRequest } from './requests/PlaceOrderRequest';
import { OrderRepository } from './repositories/order.repository';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { OrderHistory } from './entities/OrderHistory';
import { OrderHistoryRepository } from './repositories/order.history.repository';
import { ChangeOrderStatusRequest } from './requests/ChangeOrderStatusRequest';
import { GetOrdersRequest } from './requests/GetOrdersRequest';
import { GiveReviewRequest } from './requests/GiveReviewRequest';
import { Service } from '../service/entities/Service';
import { User, UserType } from '../user/entities/User';
import { OrderReview } from './entities/OrderReview';
import { OrderReviewRepository } from './repositories/order.review.repository';
import { JwtTokenService } from '../misc/jwt-token/jwt-token.service';

@Injectable()
export class OrderService {
    constructor(
        private readonly jwtTokenService: JwtTokenService,
        private readonly serviceRepository: ServiceRepository,
        private readonly orderRepository: OrderRepository,
        private readonly orderHistoryRepository: OrderHistoryRepository,
        private readonly orderReviewRepository: OrderReviewRepository,
    ) {}

    async getOrders(request: any): Promise<Result> {
        const authToken: string = request.headers.authorization;
        const jwtToken = authToken.split(' ')[1];
        const { userType, userId } = this.jwtTokenService.getUserDetailsFromToken(jwtToken as string);
        const filterOptions = {};
        if (userType === UserType.GENERAL_USER) filterOptions['orderFrom'] = userId;
        else filterOptions['orderTo'] = userId;
        const orders = await this.orderRepository.find({ where: filterOptions });
        return Result.success(orders);
    }

    async giveReview(request: GiveReviewRequest): Promise<Result> {
        let order = await this.orderRepository.findOne(request.orderId);
        if (!order) throw new CommonException(ErrorCodes.INVALID_ORDER, HttpStatus.NOT_FOUND);

        const service: Service = order.service;
        const provider: User = order.orderTo;

        const newOrderReview = new OrderReview();
        newOrderReview.order = order;
        newOrderReview.review = request.review;
        newOrderReview.rating = request.rating;
        newOrderReview.reviewFor = provider;
        newOrderReview.reviewBy = request.userId;
        await this.orderReviewRepository.save(newOrderReview);

        order.rating = request.rating;
        order.review = request.review;

        order = await this.orderRepository.save(order);

        const totalRatingAmount = service.averageRating * service.ratingCount;
        const newTotalRating = totalRatingAmount + request.rating;
        const newRatingCount = service.ratingCount + 1;
        const newAverageRating = newTotalRating / newRatingCount;

        service.ratingCount = newRatingCount;
        service.averageRating = newAverageRating;

        await this.serviceRepository.save(service);

        return Result.success(order);
    }

    async placeOrder(request: PlaceOrderRequest): Promise<Result> {
        const service = await this.serviceRepository.findOne(request.serviceId);
        if (!service) throw new CommonException(ErrorCodes.INVALID_SERVICE, HttpStatus.NOT_FOUND);

        const newOrder = new Order();

        newOrder.service = request.serviceId;
        newOrder.orderFrom = request.userId;
        newOrder.orderTo = service.provider;
        newOrder.status = OrderStatus.REQUESTED;
        newOrder.review = '';
        newOrder.rating = 0.0;

        const order = await this.orderRepository.save(newOrder);

        const orderHistory = new OrderHistory();
        orderHistory.order = order;
        orderHistory.updatedBy = request.userId;
        orderHistory.description = 'Order is requested by customer';
        await this.orderHistoryRepository.save(orderHistory);

        return Result.success(order);
    }

    async changeOrderStatus(request: ChangeOrderStatusRequest): Promise<Result> {
        const order = await this.orderRepository.findOne(request.orderId);
        if (!order) throw new CommonException(ErrorCodes.INVALID_ORDER, HttpStatus.NOT_FOUND);
        if (request.changedStatus === OrderStatus.ACCEPTED) {
            return await this.acceptOrder(order, request);
        } else if (request.changedStatus === OrderStatus.REJECTED) {
            return await this.rejectOrder(order, request);
        } else if (request.changedStatus === OrderStatus.RUNNING) {
            return await this.startOrder(order, request);
        } else if (request.changedStatus === OrderStatus.COMPLETED) {
            return await this.completeOrder(order, request);
        } else if (request.changedStatus === OrderStatus.FINISHED) {
            return await this.finishOrder(order, request);
        } else if (request.changedStatus === OrderStatus.UNFINISHED) {
            return await this.rejectFinishOrder(order, request);
        } else {
            throw new CommonException(ErrorCodes.INVALID_ORDER_STATUS, HttpStatus.FORBIDDEN);
        }
    }

    async acceptOrder(order: Order, request: ChangeOrderStatusRequest): Promise<Result> {
        if (order.status !== OrderStatus.REQUESTED) throw new CommonException(ErrorCodes.INVALID_ORDER_STATUS, HttpStatus.NOT_FOUND);
        order.status = OrderStatus.ACCEPTED;
        order = await this.orderRepository.save(order);

        const orderHistory = new OrderHistory();
        orderHistory.order = order;
        orderHistory.updatedBy = request.userId;
        orderHistory.description = 'Order is accepted by provider';
        await this.orderHistoryRepository.save(orderHistory);

        return Result.success(order);
    }

    async rejectOrder(order: Order, request: ChangeOrderStatusRequest): Promise<Result> {
        if (order.status !== OrderStatus.REQUESTED) throw new CommonException(ErrorCodes.INVALID_ORDER_STATUS, HttpStatus.EXPECTATION_FAILED);
        order.status = OrderStatus.REJECTED;
        order = await this.orderRepository.save(order);

        const orderHistory = new OrderHistory();
        orderHistory.order = order;
        orderHistory.updatedBy = request.userId;
        orderHistory.description = `Order is rejected by provider. Reason ${request.reason ? request.reason : 'Not specified'}`;
        await this.orderHistoryRepository.save(orderHistory);

        return Result.success(order);
    }

    async startOrder(order: Order, request: ChangeOrderStatusRequest): Promise<Result> {
        if (order.status !== OrderStatus.ACCEPTED) throw new CommonException(ErrorCodes.INVALID_ORDER_STATUS, HttpStatus.EXPECTATION_FAILED);
        order.status = OrderStatus.RUNNING;
        order = await this.orderRepository.save(order);

        const orderHistory = new OrderHistory();
        orderHistory.order = order;
        orderHistory.updatedBy = request.userId;
        orderHistory.description = 'Order status marked as running by customer';
        await this.orderHistoryRepository.save(orderHistory);

        return Result.success(order);
    }

    async completeOrder(order: Order, request: ChangeOrderStatusRequest): Promise<Result> {
        console.log(order);
        if (order.status !== OrderStatus.RUNNING) throw new CommonException(ErrorCodes.INVALID_ORDER_STATUS, HttpStatus.EXPECTATION_FAILED);
        order.status = OrderStatus.COMPLETED;
        order = await this.orderRepository.save(order);

        const orderHistory = new OrderHistory();
        orderHistory.order = order;
        orderHistory.updatedBy = request.userId;
        orderHistory.description = 'Order status marked as completed by provider';
        await this.orderHistoryRepository.save(orderHistory);

        return Result.success(order);
    }

    async finishOrder(order: Order, request: ChangeOrderStatusRequest): Promise<Result> {
        if (order.status !== OrderStatus.COMPLETED) throw new CommonException(ErrorCodes.INVALID_ORDER_STATUS, HttpStatus.EXPECTATION_FAILED);
        order.status = OrderStatus.FINISHED;
        order = await this.orderRepository.save(order);

        const service = order.service;
        service.orderCount = service.orderCount + 1;
        await this.serviceRepository.save(service);

        const orderHistory = new OrderHistory();
        orderHistory.order = order;
        orderHistory.updatedBy = request.userId;
        orderHistory.description = 'Order status marked as finished by customer';
        await this.orderHistoryRepository.save(orderHistory);

        return Result.success(order);
    }

    async rejectFinishOrder(order: Order, request: ChangeOrderStatusRequest): Promise<Result> {
        if (order.status !== OrderStatus.COMPLETED) throw new CommonException(ErrorCodes.INVALID_ORDER_STATUS, HttpStatus.FORBIDDEN);
        order.status = OrderStatus.UNFINISHED;
        order = await this.orderRepository.save(order);

        const orderHistory = new OrderHistory();
        orderHistory.order = order;
        orderHistory.updatedBy = request.userId;
        orderHistory.description = 'Order status marked as unfinished by customer';
        await this.orderHistoryRepository.save(orderHistory);

        return Result.success(order);
    }

    async getReviews(): Promise<Result> {
        const reviews = await this.orderReviewRepository.find();
        return Result.success(reviews);
    }
}
