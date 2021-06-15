import { RootState } from '../index';

export const selectLoggedInState = (state: RootState) => state.user.isLoggedIn;
export const selectLoggedInUserType = (state: RootState) => state.user.userType;
export const selectLoggedInUserInfo = (state: RootState) => state.user.userInfo;
export const selectUsers = (state: RootState) => state.user.users;
