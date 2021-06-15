import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from '../../models/Result';
import { UserRepository } from '../user/repositories/user.repository';
import { ServiceRepository } from './repositories/service.repository';
import { Service } from './entities/Service';
import { CreateServiceRequest } from './requests/CreateServiceRequest';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { GetFilteredServicesRequest } from './requests/GetFilteredServicesRequest';
import { Between } from 'typeorm';
import { GetServiceDetailsResponse } from './responses/GetServiceDetailsResponse';
import { EditServiceRequest } from './requests/EditServiceRequest';
import { DeleteServiceRequest } from './requests/DeleteServiceRequest';
import { OrderReviewRepository } from '../order/repositories/order.review.repository';
import { OrderRepository } from '../order/repositories/order.repository';
import { OrderStatus } from '../order/entities/Order';
import { BaseRequest } from '../../models/BaseRequest';
import { JwtPayload } from '../misc/jwt-token/JwtPayload';
import { JwtTokenService } from '../misc/jwt-token/jwt-token.service';
import { UserType } from '../user/entities/User';

@Injectable()
export class ServiceService {
    constructor(
        private readonly jwtTokenService: JwtTokenService,
        private readonly userRepository: UserRepository,
        private readonly serviceRepository: ServiceRepository,
        private readonly orderReviewRepository: OrderReviewRepository,
        private readonly orderRepository: OrderRepository,
    ) {}

    async createService(request: CreateServiceRequest): Promise<Result> {
        const newService = new Service();
        newService.name = request.name;
        newService.description = request.description;
        newService.hourlyRate = request.hourlyRate;
        newService.averageRating = 0;
        newService.provider = request.userId;
        newService.type = request.type;
        newService.preferredHour = request.preferredHour;
        const service = await this.serviceRepository.save(newService);
        return Result.success(service);
    }

    async editService(request: EditServiceRequest): Promise<Result> {
        const oldService = await this.serviceRepository.findOne(request.id);
        if (!oldService) throw new CommonException(ErrorCodes.INVALID_SERVICE, HttpStatus.NOT_FOUND);
        oldService.name = request.name;
        oldService.description = request.description;
        oldService.hourlyRate = request.hourlyRate;
        oldService.type = request.type;
        oldService.preferredHour = request.preferredHour;
        const service = await this.serviceRepository.save(oldService);
        return Result.success(service);
    }
    async deleteService(request: DeleteServiceRequest): Promise<Result> {
        const oldService = await this.serviceRepository.softDelete(request.id);
        return Result.success(oldService);
    }

    async getServices(request: any): Promise<Result> {
        const authToken: string = request.headers.authorization;
        const jwtToken = authToken.split(' ')[1];
        const { userType, userId } = this.jwtTokenService.getUserDetailsFromToken(jwtToken as string);
        if (userType === UserType.SUPER_ADMIN) return this.getAllServices();
        else return await this.getServicesProvidedByUser(userId);
    }

    async getAllServices(): Promise<Result> {
        const services = await this.serviceRepository.find();
        return Result.success(services);
    }

    async getServicesProvidedByUser(userId: number): Promise<Result> {
        const user = await this.userRepository.findOne(userId);
        if (!user) throw new CommonException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

        const services = await this.serviceRepository.find({
            where: {
                provider: userId,
            },
        });
        return Result.success(services);
    }

    async filterServices(request: GetFilteredServicesRequest): Promise<Result> {
        const filterOptions = {};
        if (request.type) filterOptions['type'] = request.type;
        filterOptions['hourlyRate'] = Between(request.minRate, request.maxRate);
        filterOptions['averageRating'] = Between(request.minRating, request.maxRating);

        const services = await this.serviceRepository.find({
            where: filterOptions,
        });

        return Result.success(services);
    }

    async getServiceDetails(serviceId: number): Promise<Result> {
        const service = await this.serviceRepository.findOne(serviceId);
        if (!service) throw new CommonException(ErrorCodes.INVALID_SERVICE, HttpStatus.NOT_FOUND);
        const response = new GetServiceDetailsResponse();
        const provider = service.provider;

        const reviews = await this.orderReviewRepository.find({
            where: {
                reviewFor: provider.id,
            },
        });

        let totalRating = 0.0;
        const totalReview = reviews.length;
        reviews.forEach(singleReview => {
            totalRating = totalRating + singleReview.rating;
        });

        const offeredServices = await this.serviceRepository.find({
            where: {
                provider: provider.id,
            },
        });

        const finishedProjects = await this.orderRepository.find({
            where: {
                orderTo: provider.id,
                status: OrderStatus.FINISHED,
            },
        });

        response.offeredServices = offeredServices;
        response.finishedProjects = finishedProjects;
        response.averageRating = totalReview ? totalRating / totalReview : 0.0;
        response.reviews = reviews;
        response.serviceProviderName = provider.name;

        console.log('response is ', response);

        return Result.success(response);
    }
}
