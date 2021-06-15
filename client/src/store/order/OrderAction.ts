import { createAsyncThunk } from '@reduxjs/toolkit';

import { OrderEffect } from './OrderEffect';
import { PlaceOrderRequest } from './requests/PlaceOrderRequest';
import { GetOrdersRequest } from './requests/GetOrdersRequest';
import { ChangeOrderStatusRequest } from './requests/ChangeOrderStatusRequest';
import { GiveReviewRequest } from './requests/GiveReviewRequest';
import BaseRequest from '../utils/BaseRequest';

export class OrderAction {
    static PLACE_ORDER = 'PLACE_ORDER';
    static GET_ORDERS = 'GET_ORDERS';
    static CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS';
    static GIVE_REVIEW = 'GIVE_REVIEW';
    static GET_REVIEWS = 'GET_REVIEWS';

    static placeOrder = createAsyncThunk(OrderAction.PLACE_ORDER, async (request: PlaceOrderRequest) => await OrderEffect.placeOrder(request));

    static getOrders = createAsyncThunk(OrderAction.GET_ORDERS, async (request: GetOrdersRequest) => await OrderEffect.getOrders(request));

    static changeOrderStatus = createAsyncThunk(
        OrderAction.CHANGE_ORDER_STATUS,
        async (request: ChangeOrderStatusRequest) => await OrderEffect.changeOrderStatus(request),
    );

    static giveReview = createAsyncThunk(OrderAction.GIVE_REVIEW, async (request: GiveReviewRequest) => await OrderEffect.giveReview(request));

    static getReviews = createAsyncThunk(OrderAction.GET_REVIEWS, async (request: BaseRequest) => await OrderEffect.getReviews(request));
}
