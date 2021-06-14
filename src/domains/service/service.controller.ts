import { Body, Controller, Get, HttpCode, Post, Put, Res } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { ServiceService } from './service.service';
import { CreateServiceRequest } from './requests/CreateServiceRequest';
import { SuccessResponse } from '../../models/SuccessResponse';
import { BaseRequest } from '../../models/BaseRequest';
import { GetFilteredServicesRequest } from './requests/GetFilteredServicesRequest';
import { EditServiceRequest } from './requests/EditServiceRequest';
import { DeleteServiceRequest } from './requests/DeleteServiceRequest';

@ApiTags('Service')
@ApiHeader({ name: 'authtoken' })
@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @Post('create')
    async createNewService(@Body() request: CreateServiceRequest, @Res() response) {
        const result = await this.serviceService.createService(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('update')
    async editService(@Body() request: EditServiceRequest, @Res() response) {
        const result = await this.serviceService.editService(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('delete')
    async deleteService(@Body() request: DeleteServiceRequest, @Res() response) {
        const result = await this.serviceService.deleteService(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('get-details')
    async getServiceDetails(@Body() request: DeleteServiceRequest, @Res() response) {
        const result = await this.serviceService.getServiceDetails(request.id);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('get-by-user')
    async getServicesByUser(@Body() request: BaseRequest, @Res() response) {
        const result = await this.serviceService.getServicesProvidedByUser(request.userId);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('get-filtered-services')
    async filterServices(@Body() request: GetFilteredServicesRequest, @Res() response) {
        const result = await this.serviceService.filterServices(request);
        response.json(new SuccessResponse(result.getValue()));
    }
}
