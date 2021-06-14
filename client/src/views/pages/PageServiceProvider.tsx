import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageServiceManagement } from './service/PageServiceManagement';
import { PageOrderManagement } from './order/PageOrderManagement';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;
export const PageServiceProvider = () => {
    const history = useHistory();
    const onChangeTab = (key) => {
        history.push(key);
    };
    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={onChangeTab}>
                <TabPane tab="Services" key="/services" />
                <TabPane tab="Orders" key="/orders" />
            </Tabs>
            <div style={{ margin: '20px' }}>
                <Route exact={true} path={'/services'} component={PageServiceManagement} />
                <Route exact={true} path={'/orders'} component={PageOrderManagement} />
            </div>
        </div>
    );
};
