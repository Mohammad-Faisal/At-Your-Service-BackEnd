import HttpUtility from './HttpUtility';
import HttpErrorResponseModel from './HttpErrorResponseModel';

export default class EffectUtility {
    static async _postToModel(Model: any, endpoint: string, data: any) {
        const response = await HttpUtility.post(endpoint, data);
        return EffectUtility._restModelCreator(Model, response);
    }

    static async _patchToModel(Model: any, endpoint: string, data: any) {
        const response = await HttpUtility.patch(endpoint, data);
        return EffectUtility._restModelCreator(Model, response);
    }

    static async _deleteToModel(Model: any, endpoint: string, data: any) {
        const response = await HttpUtility.delete(endpoint, data);
        return EffectUtility._restModelCreator(Model, response);
    }

    static async _getToModel(Model: any, endpoint: string, data: any) {
        const response = await HttpUtility.get(endpoint, data);
        return EffectUtility._restModelCreator(Model, response);
    }

    static _restModelCreator(Model: any, response: any) {
        if (response instanceof HttpErrorResponseModel) return response;
        return !Array.isArray(response.data) ? new Model(response.data) : response.data.map((json: any) => new Model(json));
    }
}
