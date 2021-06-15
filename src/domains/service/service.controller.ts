import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { ServiceService } from './service.service';
import { CreateServiceRequest } from './requests/CreateServiceRequest';
import { SuccessResponse } from '../../models/SuccessResponse';
import { BaseRequest } from '../../models/BaseRequest';
import { GetFilteredServicesRequest } from './requests/GetFilteredServicesRequest';
import { EditServiceRequest } from './requests/EditServiceRequest';
import { DeleteServiceRequest } from './requests/DeleteServiceRequest';
import { SuperAdminGuard } from '../../middlewares/super-admin.guard';
import { ServiceProviderGuard } from '../../middlewares/service-provider.guard';

@ApiTags('Service')
@ApiHeader({ name: 'authtoken' })
@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @UseGuards(ServiceProviderGuard)
    @Post()
    async createNewService(@Body() request: CreateServiceRequest, @Res() response) {
        const result = await this.serviceService.createService(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @UseGuards(ServiceProviderGuard)
    @Patch()
    async editService(@Body() request: EditServiceRequest, @Res() response) {
        const result = await this.serviceService.editService(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @UseGuards(ServiceProviderGuard)
    @Delete()
    async deleteService(@Body() request: DeleteServiceRequest, @Res() response) {
        const result = await this.serviceService.deleteService(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Get()
    async getServices(@Req() request, @Res() response) {
        const result = await this.serviceService.getServices(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Get(':id')
    async getServiceDetails(@Param('id') id: number, @Res() response) {
        const result = await this.serviceService.getServiceDetails(id);
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
