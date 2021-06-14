import { RootState } from '../index';
import { OrderStatus } from '../../constants/GeneralConstants';

export const selectOrders = (state: RootState) => {
    let orders = state.order.orders;
    orders = orders.filter((singleOrder) => singleOrder.status !== OrderStatus.FINISHED);

    return orders.map((singleOrder) => {
        return {
            orderId: singleOrder.id,
            serviceName: singleOrder.service.name,
            orderFrom: singleOrder.orderFrom.name,
            orderTo: singleOrder.orderTo.name,
            orderDate: singleOrder.createdDate,
            status: singleOrder.status,
            review: singleOrder.review,
            rating: singleOrder.rating,
        };
    });
};

export const selectFinishedOrders = (state: RootState) => {
    let orders = state.order.orders;
    orders = orders.filter((singleOrder) => singleOrder.status === OrderStatus.FINISHED);
    return orders.map((singleOrder) => {
        return {
            orderId: singleOrder.id,
            serviceName: singleOrder.service.name,
            orderFrom: singleOrder.orderFrom.name,
            orderTo: singleOrder.orderTo.name,
            orderDate: singleOrder.createdDate,
            status: singleOrder.status,
            review: singleOrder.review,
            rating: singleOrder.rating,
        };
    });
};
