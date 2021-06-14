import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageHome } from './home/PageHome';
import { PageOrderManagement } from './order/PageOrderManagement';

export const PageGeneralUser = () => {
    return (
        <Switch>
            <Route exact={true} path={'/home'} component={PageHome} />
            <Route exact={true} path={'/orders'} component={PageOrderManagement} />
        </Switch>
    );
};
