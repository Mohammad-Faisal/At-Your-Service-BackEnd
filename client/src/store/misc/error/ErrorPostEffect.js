import CommonAction from "../common/CommonAction";
import HttpErrorResponseModel from "../../utils/HttpErrorResponseModel";

const errorPostEffect = (state) => (next) => (action) => {
    const response = action.payload;
    if (response instanceof HttpErrorResponseModel) {
        action.type=  action.type.replace("/fulfilled", "/rejected");
        next(CommonAction.showErrorToast(action.payload.message))
    }
    next(action)
}

export default errorPostEffect
