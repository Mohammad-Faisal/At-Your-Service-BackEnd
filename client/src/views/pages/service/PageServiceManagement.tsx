import React from 'react';
import { FormCreateService } from './FormCreateService';
import { TableService } from './TableService';

export const PageServiceManagement = () => {
    return (
        <div style={{ margin: '20px' }}>
            <h3> Service Management </h3>
            <FormCreateService />
            <TableService />
        </div>
    );
};
