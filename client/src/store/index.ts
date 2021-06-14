import errorReducer from './misc/error/ErrorReducer';
import requestingReducer from './misc/requesting/RequestingReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userMiddleware from './user/UserPostEffect';
import userReducer from './user/UserReducer';
import finishedReducer from './misc/finished/FinishedReducer';
import commonReducer from './misc/common/CommonReducer';
import errorPostEffect from './misc/error/ErrorPostEffect';
import serviceReducer from './service/ServiceReducer';
import serviceMiddleware from './service/ServicePostEffect';
import orderReducer from './order/OrderReducer';
import orderMiddleware from './order/OrderPostEffect';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const rootReducer = {
    service: serviceReducer,
    order: orderReducer,
    user: userReducer,
    error: errorReducer,
    requesting: requestingReducer,
    finished: finishedReducer,
    common: commonReducer,
};

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['*'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
            // Ignore these paths in the state
            ignoredPaths: [''],
        },
    }),
    errorPostEffect,
    userMiddleware,
    serviceMiddleware,
    orderMiddleware,
];

export const rootStore = configureStore({
    reducer: rootReducer,
    middleware,
});

export type RootState = ReturnType<typeof rootStore.getState>;
