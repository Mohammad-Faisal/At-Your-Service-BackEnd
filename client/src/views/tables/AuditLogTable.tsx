import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Table } from 'antd';
import { ModalEditForm, Site } from '../pages/service/ModalEditForm';

interface Props {
    tableData: [];
}
export const AuditLogTable: FC<Props> = ({ tableData }) => {
    console.log(tableData);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    return <Table dataSource={tableData} columns={columns} />;
};
