import React, { useEffect, useState } from 'react';
import { PageServiceManagement } from './service/PageServiceManagement';
import { PageOrderManagement } from './order/PageOrderManagement';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
export const PageServiceProvider = () => {
    const [selectedTab, setSelectedTab] = useState('1');
    useEffect(() => {}, [selectedTab]);
    return (
        <div style={{ padding: '20px' }}>
            <Tabs centered type={'card'} onChange={(key) => setSelectedTab(key)} defaultActiveKey="1">
                <TabPane tab="Services" key="1">
                    <PageServiceManagement />
                </TabPane>
                <TabPane tab="Orders" key="/orders">
                    <PageOrderManagement />
                </TabPane>
            </Tabs>
        </div>
    );
};
