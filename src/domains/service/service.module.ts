import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { ServiceRepository } from './repositories/service.repository';
import { OrderReviewRepository } from '../order/repositories/order.review.repository';
import { OrderRepository } from '../order/repositories/order.repository';
import { JwtTokenModule } from '../misc/jwt-token/jwt-token.module';

@Module({
    imports: [JwtTokenModule, TypeOrmModule.forFeature([ServiceRepository, UserRepository, OrderReviewRepository, OrderRepository])],
    providers: [ServiceService],
    controllers: [ServiceController],
})
export class ServiceModule {}
