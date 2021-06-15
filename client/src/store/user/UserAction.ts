import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SignInRequest } from './request-models/SignInRequest';
import { SignUpRequest } from './request-models/SignUpRequest';
import { UserEffect } from './UserEffect';
import { GetUsersRequest } from './request-models/GetUsersRequest';

export class UserAction {
    static SIGN_UP = 'SIGN_UP';
    static SIGN_IN = 'SIGN_IN';
    static SIGN_OUT = 'SIGN_OUT';
    static GET_USERS = 'GET_USERS';

    static signUp = createAsyncThunk(UserAction.SIGN_UP, async (request: SignUpRequest) => {
        return await UserEffect.signUp(request);
    });

    static signIn = createAsyncThunk(UserAction.SIGN_IN, async (request: SignInRequest) => {
        return await UserEffect.signIn(request);
    });
    static getUsers = createAsyncThunk(UserAction.GET_USERS, async (request: GetUsersRequest) => {
        return await UserEffect.getUsers(request);
    });

    static signOut = createAction(UserAction.SIGN_OUT);
}
