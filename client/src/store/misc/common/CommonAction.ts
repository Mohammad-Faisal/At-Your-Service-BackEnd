import {Notification} from "./general-models/Notification";
import {ActionUtility} from "../../utils/ActionUtility";
import {NotificationType} from "./general-models/NotificationType";

export default class CommonAction {

    static SHOW_MODAL = 'SHOW_SUCCESS_MODAL'

    static SHOW_TOAST = 'SHOW_SUCCESS_TOAST'

    static showSuccessModal  = (message:string) => ActionUtility._createAction(CommonAction.SHOW_MODAL, new Notification(message , NotificationType.SUCCESS))

    static showWarningModal  = (message:string) => ActionUtility._createAction(CommonAction.SHOW_MODAL, new Notification(message , NotificationType.WARNING))

    static showErrorModal  = (message:string) => ActionUtility._createAction(CommonAction.SHOW_MODAL, new Notification(message , NotificationType.ERROR))

    static showSuccessToast  = (message:string) => ActionUtility._createAction(CommonAction.SHOW_TOAST, new Notification(message , NotificationType.SUCCESS))

    static showWarningToast  = (message:string) => ActionUtility._createAction(CommonAction.SHOW_TOAST, new Notification(message , NotificationType.WARNING))

    static showErrorToast  = (message:string) => ActionUtility._createAction(CommonAction.SHOW_TOAST, new Notification(message , NotificationType.ERROR))

}
