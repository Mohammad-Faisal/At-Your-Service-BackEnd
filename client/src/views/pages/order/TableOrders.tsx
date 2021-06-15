import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Table, Tag } from 'antd';
import { selectLoggedInUserType } from '../../../store/user/UserSelector';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { OrderAction } from '../../../store/order/OrderAction';
import { GetOrdersRequest } from '../../../store/order/requests/GetOrdersRequest';
import { selectOrders } from '../../../store/order/OrderSelector';
import { OrderStatus, UserType } from '../../../constants/GeneralConstants';
import { ChangeOrderStatusRequest } from '../../../store/order/requests/ChangeOrderStatusRequest';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import { BeatLoader } from 'react-spinners';
import { TableTitle } from '../../common-components/layout/TableTitle';

const { confirm } = Modal;

export const TableOrders: FC = () => {
    const tableData = useSelector(selectOrders);
    const userType = useSelector(selectLoggedInUserType);
    const dispatch = useDispatch();

    const isRequesting = useSelector((state) => selectRequesting(state, [OrderAction.GET_ORDERS]));
    const isFinishedUpdate = useSelector((state) => selectFinished(state, [OrderAction.CHANGE_ORDER_STATUS]));
    const isFinishedReview = useSelector((state) => selectFinished(state, [OrderAction.GIVE_REVIEW]));

    useEffect(() => {
        getOrders();
    }, [isFinishedUpdate, isFinishedReview]);

    const getOrders = () => dispatch(OrderAction.getOrders(new GetOrdersRequest()));

    const changeOrderStatus = (orderId, newStatus: OrderStatus) => {
        let confirmText = '';
        let content = '';
        if (newStatus === OrderStatus.ACCEPTED) {
            confirmText = 'Are you sure to accept this order?';
            content = 'After you accept this order the next step will be done by the user';
        } else if (newStatus === OrderStatus.REJECTED) {
            confirmText = 'Are you sure to reject this order?';
            content = "After you reject this order you can't change it's status anymore";
        } else if (newStatus === OrderStatus.RUNNING) {
            confirmText = 'Are you sure to start this order?';
            content = "Once you start only the service provider can change it's status";
        } else if (newStatus === OrderStatus.COMPLETED) {
            confirmText = 'Are you sure to complete this order?';
            content = 'After you complete the order the user needs to verify this';
        } else if (newStatus === OrderStatus.FINISHED) {
            confirmText = 'Are you happy with this order?';
            content = 'If you are happy then provide a review';
        } else if (newStatus === OrderStatus.UNFINISHED) {
            confirmText = 'Is something wrong with the order?';
            content = 'If something went wrong then give a review';
        }
        confirm({
            title: confirmText,
            icon: <ExclamationCircleOutlined />,
            content,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => dispatch(OrderAction.changeOrderStatus(new ChangeOrderStatusRequest(orderId, newStatus))),
        });
    };

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
            render: (text, record) => {
                console.log(record.status);
                switch (record.status) {
                    case OrderStatus.REQUESTED:
                        return <Tag color={'yellow'}> Requested</Tag>;
                    case OrderStatus.ACCEPTED:
                        return <Tag color={'green'}> Accepted</Tag>;
                    case OrderStatus.REJECTED:
                        return <Tag color={'red'}> Rejected</Tag>;
                    case OrderStatus.RUNNING:
                        return <BeatLoader color={'#36D7B7'} />;
                    case OrderStatus.COMPLETED:
                        return <Tag color={'green'}> Completed</Tag>;
                    case OrderStatus.FINISHED:
                        return <Tag color={'blue'}> Delivered</Tag>;
                    case OrderStatus.UNFINISHED:
                        return <Tag color={'red'}> Unfinished</Tag>;
                    default:
                        return <Tag>{record.status}</Tag>;
                }
            },
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
            render: (text: string, record) => {
                if (userType === UserType.SERVICE_PROVIDER && record.status === OrderStatus.REQUESTED) {
                    return (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '10px' }}>
                            <Button onClick={() => changeOrderStatus(record.orderId, OrderStatus.ACCEPTED)}> Accept </Button>
                            <Button danger={true} onClick={() => changeOrderStatus(record.orderId, OrderStatus.REJECTED)}>
                                {'Reject Request'}
                            </Button>
                        </div>
                    );
                } else if (userType === UserType.GENERAL_USER && record.status === OrderStatus.ACCEPTED) {
                    return <Button onClick={() => changeOrderStatus(record.orderId, OrderStatus.RUNNING)}> Start Order </Button>;
                } else if (userType === UserType.SERVICE_PROVIDER && record.status === OrderStatus.RUNNING) {
                    return <Button onClick={() => changeOrderStatus(record.orderId, OrderStatus.COMPLETED)}> Complete Order </Button>;
                } else if (userType === UserType.GENERAL_USER && record.status === OrderStatus.COMPLETED) {
                    return (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '10px' }}>
                            <Button onClick={() => changeOrderStatus(record.orderId, OrderStatus.FINISHED)}> Verify Service </Button>
                            <Button danger={true} onClick={() => changeOrderStatus(record.orderId, OrderStatus.UNFINISHED)}>
                                {'Reject Service'}
                            </Button>
                        </div>
                    );
                }
            },
        },
    ];

    return (
        <div style={{ margin: '20px 0px' }}>
            <TableTitle title={'Running orders'} onClick={getOrders} />
            <Table loading={isRequesting} dataSource={tableData} columns={columns} />
        </div>
    );
};
