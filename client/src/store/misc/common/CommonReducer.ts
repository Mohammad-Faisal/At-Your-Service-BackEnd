import {createReducer} from "@reduxjs/toolkit";
import CommonAction from "./CommonAction";
import {Notification} from "./general-models/Notification";
import {NotificationType} from "./general-models/NotificationType";

interface ICommonState {
    modalNotification:  Notification,
    toastNotification:  Notification,
}

const initialState: ICommonState = {
    modalNotification: new Notification('Default Notification' , NotificationType.DEFAULT),
    toastNotification:  new Notification('Default Notification' , NotificationType.DEFAULT),
}

const commonReducer = createReducer(initialState, {

    [CommonAction.SHOW_MODAL]:(state , action) => {
        state.modalNotification= action.payload
    },

    [CommonAction.SHOW_TOAST]:(state , action) => {
        state.toastNotification= action.payload
    },

});

export default commonReducer;
