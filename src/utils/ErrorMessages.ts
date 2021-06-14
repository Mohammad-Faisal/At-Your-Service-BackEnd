import ErrorCodes from './ErrorCodes';

export default class ErrorMessages {
    static getMessage(errorCode: number) {
        switch (errorCode) {
            case ErrorCodes.USER_NOT_FOUND:
                return 'User Info Not Found';
            case ErrorCodes.SITE_NOT_FOUND:
                return 'Site Info Not Found';
            case ErrorCodes.USER_ALREADY_EXISTS:
                return 'User Already Exists in The System';
            case ErrorCodes.INVALID_SERVICE:
                return 'Service not found';
            case ErrorCodes.INVALID_ORDER:
                return 'Order not found!';
            case ErrorCodes.INVALID_ORDER_STATUS:
                return 'You can not change the order status now!';
            default:
                return 'Some Error Occurred';
        }
    }
}
