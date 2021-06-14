import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { ServiceRepository } from './repositories/service.repository';
import { OrderReviewRepository } from '../order/repositories/order.review.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ServiceRepository, UserRepository , OrderReviewRepository])],
    providers: [ServiceService],
    controllers: [ServiceController],
})
export class ServiceModule {}
