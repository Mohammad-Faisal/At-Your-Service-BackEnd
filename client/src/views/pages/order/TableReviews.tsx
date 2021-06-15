import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag } from 'antd';
import { OrderAction } from '../../../store/order/OrderAction';
import { selectReviews } from '../../../store/order/OrderSelector';
import { OrderStatus } from '../../../constants/GeneralConstants';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import { BeatLoader } from 'react-spinners';
import BaseRequest from '../../../store/utils/BaseRequest';

export const TableReviews: FC = () => {
    const tableData = useSelector(selectReviews);
    const dispatch = useDispatch();

    const isRequesting = useSelector((state) => selectRequesting(state, [OrderAction.GET_REVIEWS]));

    useEffect(() => {
        dispatch(OrderAction.getReviews(new BaseRequest()));
    }, []);

    console.log(tableData);
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
            title: 'Review By',
            dataIndex: 'reviewBy',
        },
        {
            title: 'Service Provider',
            dataIndex: 'reviewFor',
        },
        {
            title: 'Order Date',
            dataIndex: 'createdDate',
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

    return (
        <div style={{ margin: '20px' }}>
            <h3> Reviews </h3>
            <Table loading={isRequesting} dataSource={tableData} columns={columns} />
        </div>
    );
};
