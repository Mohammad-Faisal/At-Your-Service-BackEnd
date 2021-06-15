import React from 'react';
import { TableOrders } from './TableOrders';
import { FinishedOrdersTable } from './FinishedOrdersTable';

export const PageOrderManagement = () => {
    return (
        <div style={{ margin: '20px' }}>
            <TableOrders />
            <FinishedOrdersTable />
        </div>
    );
};
