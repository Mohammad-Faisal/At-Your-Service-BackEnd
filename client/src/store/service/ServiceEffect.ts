import { ApiEndpoints } from '../../constants/ApiEndpoints';
import BaseRequest from '../utils/BaseRequest';
import EffectUtility from '../utils/EffectUtility';
import ServerGeneralizedResponse from '../utils/ServerGeneralizedResponse';
import { GetFilteredServicesRequests } from './requests/GetFilteredServicesRequests';
import { CreateServiceRequest } from './requests/CreateServiceRequest';
import { DeleteServiceRequest } from './requests/DeleteServiceRequest';
import { UpdateServiceRequest } from './requests/UpdateServiceRequest';

export class ServiceEffect {
    static createService = async (data: CreateServiceRequest) => {
        const endPoint = ApiEndpoints.service.createService;
        return await EffectUtility._postToModel(ServerGeneralizedResponse, endPoint, new BaseRequest(data));
    };

    static updateService = async (data: UpdateServiceRequest) => {
        const endPoint = ApiEndpoints.service.updateService;
        return await EffectUtility._postToModel(ServerGeneralizedResponse, endPoint, new BaseRequest(data));
    };

    static deleteService = async (data: DeleteServiceRequest) => {
        const endPoint = ApiEndpoints.service.deleteService;
        return await EffectUtility._postToModel(ServerGeneralizedResponse, endPoint, new BaseRequest(data));
    };

    static getDetails = async (data: DeleteServiceRequest) => {
        const endPoint = ApiEndpoints.service.getDetails;
        return await EffectUtility._postToModel(ServerGeneralizedResponse, endPoint, new BaseRequest(data));
    };

    static getServicesByProvider = async (data: BaseRequest) => {
        const endPoint = ApiEndpoints.service.getServiceByProvider;
        return await EffectUtility._postToModel(ServerGeneralizedResponse, endPoint, new BaseRequest(data));
    };

    static getFilteredServices = async (data: GetFilteredServicesRequests) => {
        const endPoint = ApiEndpoints.service.getFilteredServices;
        return await EffectUtility._postToModel(ServerGeneralizedResponse, endPoint, new BaseRequest(data));
    };
}
