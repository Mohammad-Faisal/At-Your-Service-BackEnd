import { ActionUtility } from '../utils/ActionUtility';
import CommonAction from '../misc/common/CommonAction';
import { OrderAction } from './OrderAction';

const orderMiddleware = (state) => (next) => (action) => {
    const { getState, dispatch } = state;

    switch (action.type) {
        case ActionUtility.getFulfilledAction(OrderAction.PLACE_ORDER):
            dispatch(CommonAction.showSuccessModal('Order Placed Successfully!'));
            break;
        case ActionUtility.getFulfilledAction(OrderAction.CHANGE_ORDER_STATUS):
            dispatch(CommonAction.showSuccessModal('Order status changed Successfully!'));
            break;
        case ActionUtility.getFulfilledAction(OrderAction.GIVE_REVIEW):
            dispatch(CommonAction.showSuccessModal('Review given successfully!'));
            break;
        default:
            break;
    }
    next(action);
};

export default orderMiddleware;
