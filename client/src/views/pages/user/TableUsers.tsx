import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tabs, Tag } from 'antd';

import { selectUsers } from '../../../store/user/UserSelector';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import { UserAction } from '../../../store/user/UserAction';
import { GetUsersRequest } from '../../../store/user/request-models/GetUsersRequest';
import { UserType } from '../../../constants/GeneralConstants';
const { TabPane } = Tabs;
export const TableUsers: FC = () => {
    const dispatch = useDispatch();
    const tableData = useSelector(selectUsers);
    const [userType, setUserType] = useState<UserType>(UserType.SERVICE_PROVIDER);

    const isRequesting = useSelector((state) => selectRequesting(state, [UserAction.GET_USERS]));

    useEffect(() => {
        dispatch(UserAction.getUsers(new GetUsersRequest(userType)));
    }, [userType]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Type',
            render: (text, record) => {
                if (record.userType === UserType.GENERAL_USER) return <Tag color={'blue'}> Customer</Tag>;
                else if (record.userType === UserType.SERVICE_PROVIDER) return <Tag color={'red'}> Specialist</Tag>;
            },
        },
    ];

    const changeUserType = (newVal: UserType) => {
        setUserType(newVal);
    };

    return (
        <div style={{ margin: '20px' }}>
            <h3> Users List</h3>
            <Tabs defaultActiveKey="services" centered onChange={changeUserType}>
                <TabPane tab="Specialists" key={UserType.SERVICE_PROVIDER} />
                <TabPane tab="Customer" key={UserType.GENERAL_USER} />
            </Tabs>
            <Table dataSource={tableData} columns={columns} loading={isRequesting} />
        </div>
    );
};
