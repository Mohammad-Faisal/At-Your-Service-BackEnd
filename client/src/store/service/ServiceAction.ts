import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { CreateServiceRequest } from './requests/CreateServiceRequest';
import BaseRequest from '../utils/BaseRequest';
import { ServiceEffect } from './ServiceEffect';
import { GetFilteredServicesRequests } from './requests/GetFilteredServicesRequests';
import { UpdateServiceRequest } from './requests/UpdateServiceRequest';
import { DeleteServiceRequest } from './requests/DeleteServiceRequest';

export class ServiceAction {
    static CREATE_SERVICE = 'CREATE_SERVICE';
    static UPDATE_SERVICE = 'UPDATE_SERVICE';
    static DELETE_SERVICE = 'DELETE_SERVICE';
    static GET_SERVICES_BY_PROVIDER = 'GET_SERVICES_BY_PROVIDER';
    static GET_DETAILS = 'GET_DETAILS';
    static GET_FILTERED_SERVICES = 'GET_FILTERED_SERVICES';

    static createService = createAsyncThunk(
        ServiceAction.CREATE_SERVICE,
        async (request: CreateServiceRequest) => await ServiceEffect.createService(request),
    );

    static updateService = createAsyncThunk(
        ServiceAction.UPDATE_SERVICE,
        async (request: UpdateServiceRequest) => await ServiceEffect.updateService(request),
    );

    static deleteService = createAsyncThunk(
        ServiceAction.DELETE_SERVICE,
        async (request: DeleteServiceRequest) => await ServiceEffect.deleteService(request),
    );

    static getDetails = createAsyncThunk(ServiceAction.GET_DETAILS, async (request: DeleteServiceRequest) => await ServiceEffect.getDetails(request));

    static getServicesByProvider = createAsyncThunk(
        ServiceAction.GET_SERVICES_BY_PROVIDER,
        async (request: BaseRequest) => await ServiceEffect.getServicesByProvider(request),
    );

    static getFilteredServices = createAsyncThunk(
        ServiceAction.GET_FILTERED_SERVICES,
        async (request: GetFilteredServicesRequests) => await ServiceEffect.getFilteredServices(request),
    );

    // static setSiteDataForEdit  = createAction<any>(SiteAction.SET_SITE_DATA_FOR_EDIT)
    //
    // static clearSiteDataForEdit  = createAction(SiteAction.CLEAR_SITE_DATA_FOR_EDIT)
}
