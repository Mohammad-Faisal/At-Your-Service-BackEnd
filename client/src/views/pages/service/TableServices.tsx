import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { ServiceAction } from '../../../store/service/ServiceAction';
import BaseRequest from '../../../store/utils/BaseRequest';
import { selectServices } from '../../../store/service/ServiceSelector';
import { selectLoggedInState, selectLoggedInUserType } from '../../../store/user/UserSelector';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { ModalEditForm } from './ModalEditForm';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import ModalDeleteConfirmation from '../../common-components/modals/ModalDeleteConfirmation';
import { DeleteServiceRequest } from '../../../store/service/requests/DeleteServiceRequest';
import { UserType } from '../../../constants/GeneralConstants';
import { GetFilteredServicesRequests } from '../../../store/service/requests/GetFilteredServicesRequests';
import { TableTitle } from '../../common-components/layout/TableTitle';

export const TableServices: FC = () => {
    const dispatch = useDispatch();
    const tableData = useSelector(selectServices);
    const isSignedIn = useSelector(selectLoggedInState);
    const loggedInUserType = useSelector(selectLoggedInUserType);

    const isRequesting = useSelector((state) => selectRequesting(state, [ServiceAction.GET_SERVICES_BY_PROVIDER]));
    const isFinishedCreate = useSelector((state) => selectFinished(state, [ServiceAction.CREATE_SERVICE]));
    const isFinishedUpdate = useSelector((state) => selectFinished(state, [ServiceAction.UPDATE_SERVICE]));
    const isFinishedDelete = useSelector((state) => selectFinished(state, [ServiceAction.DELETE_SERVICE]));

    useEffect(() => {
        getServices();
    }, [dispatch, isSignedIn, isFinishedCreate, isFinishedUpdate, isFinishedDelete]);

    const getServices = () => {
        if (loggedInUserType === UserType.SERVICE_PROVIDER) dispatch(ServiceAction.getServicesByProvider(new BaseRequest()));
        else dispatch(ServiceAction.getFilteredServices(new GetFilteredServicesRequests()));
    };

    let columns = [
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
            render: (text, record) => <div>{record.preferredHour ? `${record.preferredHour[0]} to ${record.preferredHour[1]}` : 'Not Found'}</div>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
    ];

    if (loggedInUserType === UserType.SERVICE_PROVIDER) {
        columns = columns.concat([
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
        ]);
    }

    return (
        <div style={{ margin: '20px 0px' }}>
            <TableTitle title={'Services'} onClick={getServices} />
            <Table dataSource={tableData} columns={columns} loading={isRequesting} />
        </div>
    );
};
