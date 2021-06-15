import {ActionUtility} from "../utils/ActionUtility";
import {UserAction} from "./UserAction";

const userMiddleware = (state) => next => action => {

    const { getState, dispatch } = state;

    switch (action.type) {
        case ActionUtility.getFulfilledAction(UserAction.SIGN_IN):
        case ActionUtility.getFulfilledAction(UserAction.SIGN_UP):
            localStorage.setItem('JWT_TOKEN', action.payload?.data?.jwtToken);
            break;
    }

    next(action)
}


export default userMiddleware;