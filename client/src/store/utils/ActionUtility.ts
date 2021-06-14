import HttpErrorResponseModel from "./HttpErrorResponseModel";

export class ActionUtility {

    static getFulfilledAction = (actionName:string) =>`${actionName}/fulfilled`

    static getPendingAction = (actionName:string) =>`${actionName}/pending`

    static async _createThunkEffect(dispatch:any, actionType:string, effect:any, ...args:any) {
        dispatch(ActionUtility._createAction(actionType))
        const model = await effect(...args)
        const isError = model instanceof HttpErrorResponseModel
        dispatch(ActionUtility._createAction(`${actionType}_FINISHED`, model, isError))
        return model
    }

    static _createAction(type:string, payload:any = undefined, error = false, meta = null) {
        return { type, payload, error, meta }
    }

}