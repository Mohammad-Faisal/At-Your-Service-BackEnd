import HttpUtility from './HttpUtility'
import HttpErrorResponseModel from "./HttpErrorResponseModel";

export default class EffectUtility {

    static async _postToModel(Model:any, endpoint:string, data:any) {
        const response = await HttpUtility.post(endpoint, data);
        return EffectUtility._restModelCreator(Model, response);
    }

    static _restModelCreator(Model:any, response:any) {
        if (response instanceof HttpErrorResponseModel)  return response
        return !Array.isArray(response.data)
            ? new Model(response.data)
            : response.data.map((json: any) => new Model(json))
    }
}
