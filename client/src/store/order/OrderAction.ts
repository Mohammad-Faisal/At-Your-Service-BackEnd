import {createAsyncThunk} from "@reduxjs/toolkit";

import {OrderEffect} from "./OrderEffect";
import {PlaceOrderRequest} from "./requests/PlaceOrderRequest";
import {GetOrdersRequest} from "./requests/GetOrdersRequest";
import {ChangeOrderStatusRequest} from "./requests/ChangeOrderStatusRequest";
import {GiveReviewRequest} from "./requests/GiveReviewRequest";

export class OrderAction {

    static PLACE_ORDER = "PLACE_ORDER"
    static GET_ORDERS = "GET_ORDERS"
    static CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS"
    static GIVE_REVIEW = "GIVE_REVIEW"

    static placeOrder = createAsyncThunk(
        OrderAction.PLACE_ORDER,
        async (request: PlaceOrderRequest) =>  await OrderEffect.placeOrder(request)
    );

    static getOrders = createAsyncThunk(
        OrderAction.GET_ORDERS,
        async (request: GetOrdersRequest) =>  await OrderEffect.getOrders(request)
    );

    static changeOrderStatus = createAsyncThunk(
        OrderAction.CHANGE_ORDER_STATUS,
        async (request: ChangeOrderStatusRequest) => await OrderEffect.changeOrderStatus(request)
    );

    static giveReview = createAsyncThunk(
        OrderAction.GIVE_REVIEW,
        async (request: GiveReviewRequest) => await OrderEffect.giveReview(request)
    );

    // static setSiteDataForEdit  = createAction<any>(SiteAction.SET_SITE_DATA_FOR_EDIT)
    //
    // static clearSiteDataForEdit  = createAction(SiteAction.CLEAR_SITE_DATA_FOR_EDIT)


}