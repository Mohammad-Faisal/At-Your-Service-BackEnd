import React from 'react';
import { OrdersTable } from './OrdersTable';
import { FinishedOrdersTable } from './FinishedOrdersTable';

export const PageOrderManagement = () => {
    return (
        <div style={{ margin: '20px' }}>
            <OrdersTable />
            <FinishedOrdersTable />
        </div>
    );
};
