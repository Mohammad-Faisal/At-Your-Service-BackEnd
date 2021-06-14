import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Table } from 'antd';
import { selectLoggedInUserType } from '../../../store/user/UserSelector';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { OrderAction } from '../../../store/order/OrderAction';
import { GetOrdersRequest } from '../../../store/order/requests/GetOrdersRequest';
import { selectFinishedOrders, selectOrders } from '../../../store/order/OrderSelector';
import { OrderStatus, UserType } from '../../../constants/GeneralConstants';
import { ChangeOrderStatusRequest } from '../../../store/order/requests/ChangeOrderStatusRequest';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ModalReviewOrder } from './ModalReviewOrder';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';

const { confirm } = Modal;

export const FinishedOrdersTable: FC = () => {
    const tableData = useSelector(selectFinishedOrders);
    const userType = useSelector(selectLoggedInUserType);
    const dispatch = useDispatch();

    const isRequesting = useSelector((state) => selectRequesting(state, [OrderAction.GET_ORDERS]));
    const isFinishedUpdate = useSelector((state) => selectFinished(state, [OrderAction.CHANGE_ORDER_STATUS]));
    const isFinishedReview = useSelector((state) => selectFinished(state, [OrderAction.GIVE_REVIEW]));

    useEffect(() => {
        dispatch(OrderAction.getOrders(new GetOrdersRequest()));
    }, [isFinishedUpdate, isFinishedReview]);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
        },
        {
            title: 'Service Name',
            dataIndex: 'serviceName',
        },
        {
            title: 'Ordered By',
            dataIndex: 'orderFrom',
        },
        {
            title: 'Service Provider',
            dataIndex: 'orderTo',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Review',
            dataIndex: 'review',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },

        {
            title: 'Action',
            render: (text: string, record) => <ModalReviewOrder orderId={record.orderId} />,
        },
    ];

    return (
        <div style={{ margin: '20px' }}>
            <h3> Finished Orders</h3>
            <Table loading={isRequesting} dataSource={tableData} columns={columns} />
        </div>
    );
};
