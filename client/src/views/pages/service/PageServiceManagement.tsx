import React from 'react';
import { FormCreateService } from './FormCreateService';
import { TableServices } from './TableServices';

export const PageServiceManagement = () => {
    return (
        <div style={{ margin: '20px' }}>
            <h3> Service Management </h3>
            <FormCreateService />
            <TableServices />
        </div>
    );
};
