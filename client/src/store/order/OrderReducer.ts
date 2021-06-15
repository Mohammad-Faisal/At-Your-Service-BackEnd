import { createReducer } from '@reduxjs/toolkit';
import { ActionUtility } from '../utils/ActionUtility';
import { OrderAction } from './OrderAction';

const initialState = {
    orders: [],
    reviews: [],
};

const orderReducer = createReducer(initialState, {
    [ActionUtility.getFulfilledAction(OrderAction.GET_ORDERS)]: (state, action) => {
        state.orders = action.payload.data;
    },
    [ActionUtility.getFulfilledAction(OrderAction.GET_REVIEWS)]: (state, action) => {
        state.reviews = action.payload.data;
    },
});

export default orderReducer;
