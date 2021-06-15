import { createReducer } from '@reduxjs/toolkit';
import { UserAction } from './UserAction';
import { ActionUtility } from '../utils/ActionUtility';
import { UserType } from '../../constants/GeneralConstants';

const initialState = {
    userInfo: {},
    jwtToken: '',
    isLoggedIn: false,
    users: [],
    userType: localStorage.getItem('USER_TYPE'),
};

const userReducer = createReducer(initialState, {
    [ActionUtility.getFulfilledAction(UserAction.SIGN_IN)]: (state, action) => {
        localStorage.setItem('USER_TYPE', action.payload.data.userType);
        state.userInfo = action.payload;
        state.userType = action.payload.data.userType;
        state.isLoggedIn = true;
    },

    [ActionUtility.getFulfilledAction(UserAction.SIGN_UP)]: (state, action) => {
        localStorage.setItem('USER_TYPE', action.payload.data.userType);
        state.userInfo = action.payload;
        state.userType = action.payload.data.userType;
        state.isLoggedIn = true;
    },

    [UserAction.SIGN_OUT]: (state, action) => {
        localStorage.setItem('USER_TYPE', UserType.UNAUTHENTICATED);
        state.userInfo = {};
        state.userType = UserType.UNAUTHENTICATED;
        state.isLoggedIn = false;
    },
    [ActionUtility.getFulfilledAction(UserAction.GET_USERS)]: (state, action) => {
        state.users = action.payload.data;
    },
});

export default userReducer;
