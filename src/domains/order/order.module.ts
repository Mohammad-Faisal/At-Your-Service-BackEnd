import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from '../service/repositories/service.repository';
import { OrderRepository } from './repositories/order.repository';
import { OrderHistoryRepository } from './repositories/order.history.repository';
import { OrderReviewRepository } from './repositories/order.review.repository';
import { JwtTokenModule } from '../misc/jwt-token/jwt-token.module';

@Module({
    imports: [JwtTokenModule, TypeOrmModule.forFeature([ServiceRepository, OrderRepository, OrderHistoryRepository, OrderReviewRepository])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
