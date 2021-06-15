import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { OrderAction } from '../../../store/order/OrderAction';
import { GetOrdersRequest } from '../../../store/order/requests/GetOrdersRequest';
import { selectFinishedOrders } from '../../../store/order/OrderSelector';
import { ModalReviewOrder } from './ModalReviewOrder';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import { selectLoggedInUserType } from '../../../store/user/UserSelector';
import { UserType } from '../../../constants/GeneralConstants';

export const FinishedOrdersTable: FC = () => {
    const tableData = useSelector(selectFinishedOrders);
    const dispatch = useDispatch();
    const userType = useSelector(selectLoggedInUserType);

    const isRequesting = useSelector((state) => selectRequesting(state, [OrderAction.GET_ORDERS]));
    const isFinishedUpdate = useSelector((state) => selectFinished(state, [OrderAction.CHANGE_ORDER_STATUS]));
    const isFinishedReview = useSelector((state) => selectFinished(state, [OrderAction.GIVE_REVIEW]));

    useEffect(() => {
        dispatch(OrderAction.getOrders(new GetOrdersRequest()));
    }, [isFinishedUpdate, isFinishedReview]);

    let columns: any[] = [
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
            title: 'Review',
            dataIndex: 'review',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
    ];

    if (userType === UserType.GENERAL_USER) {
        columns = columns.concat([
            {
                title: 'Action',
                render: (text: string, record) => <ModalReviewOrder orderId={record.orderId} />,
            },
        ]);
    }

    return (
        <div style={{ margin: '20px 0px' }}>
            <h3> Finished Orders</h3>
            <Table loading={isRequesting} dataSource={tableData} columns={columns} />
        </div>
    );
};
