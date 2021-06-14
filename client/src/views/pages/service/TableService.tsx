import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';

import { ServiceAction } from '../../../store/service/ServiceAction';
import BaseRequest from '../../../store/utils/BaseRequest';
import { selectServices } from '../../../store/service/ServiceSelector';
import { selectLoggedInState } from '../../../store/user/UserSelector';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { ModalEditForm } from './ModalEditForm';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import ModalDeleteConfirmation from '../../modals/ModalDeleteConfirmation';
import { DeleteServiceRequest } from '../../../store/service/requests/DeleteServiceRequest';

export const TableService: FC = () => {
    const dispatch = useDispatch();
    const tableData = useSelector(selectServices);
    const isSignedIn = useSelector(selectLoggedInState);

    const isRequesting = useSelector((state) => selectRequesting(state, [ServiceAction.GET_SERVICES_BY_PROVIDER]));
    const isFinishedCreate = useSelector((state) => selectFinished(state, [ServiceAction.CREATE_SERVICE]));
    const isFinishedUpdate = useSelector((state) => selectFinished(state, [ServiceAction.UPDATE_SERVICE]));
    const isFinishedDelete = useSelector((state) => selectFinished(state, [ServiceAction.DELETE_SERVICE]));

    useEffect(() => {
        dispatch(ServiceAction.getServicesByProvider(new BaseRequest()));
    }, [dispatch, isSignedIn, isFinishedCreate, isFinishedUpdate, isFinishedDelete]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Hourly Rate',
            dataIndex: 'hourlyRate',
        },
        {
            title: 'Rating',
            dataIndex: 'averageRating',
        },
        {
            title: 'Preferred Hour',
            dataIndex: 'preferredHour',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Edit',
            render: (text: string, record) => <ModalEditForm existingService={record} />,
        },
        {
            title: 'Delete',
            render: (text, record) => (
                <ModalDeleteConfirmation
                    tooltip={'Delete Service'}
                    okText={'Confirm'}
                    cancelText={'Cancel'}
                    confirmationText={'Are you sure you want to delete this service?'}
                    onConfirm={() => dispatch(ServiceAction.deleteService(new DeleteServiceRequest(record.id)))}
                />
            ),
        },
    ];

    return (
        <div style={{ margin: '20px' }}>
            <h3> Service Table</h3>
            <Table dataSource={tableData} columns={columns} loading={isRequesting} />
        </div>
    );
};
