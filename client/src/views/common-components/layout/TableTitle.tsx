import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import React from 'react';

export const TableTitle = ({ title, onClick }) => {
    return (
        <div style={{ display: 'grid', textAlign: 'start', gridTemplateColumns: '1fr auto', justifyItems: 'space-apart' }}>
            <h2> {title} </h2>
            <Button icon={<ReloadOutlined />} onClick={onClick}>
                {'Reload '}
            </Button>
        </div>
    );
};
