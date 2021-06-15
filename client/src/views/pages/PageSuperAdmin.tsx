import React from 'react';

import { TableUsers } from './user/TableUsers';
import { Tabs } from 'antd';
import { TableReviews } from './order/TableReviews';
import { TableServices } from './service/TableServices';

const { TabPane } = Tabs;
export const PageSuperAdmin = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Tabs centered type={'card'} defaultActiveKey="1">
                <TabPane tab="Users" key="/services">
                    <TableUsers />
                </TabPane>
                <TabPane tab="Services" key="/orders">
                    <TableServices />
                </TabPane>
                <TabPane tab="Reviews" key="/reviews">
                    <TableReviews />
                </TabPane>
            </Tabs>
        </div>
    );
};
