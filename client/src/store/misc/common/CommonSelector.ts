import {RootState} from "../../index";

export const selectModalNotification = (state: RootState) => state.common.modalNotification;

export const selectToastNotification = (state: RootState) => state.common.toastNotification;
