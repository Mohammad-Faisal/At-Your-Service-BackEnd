import { EntityRepository, Repository } from 'typeorm';
import { OrderHistory } from '../entities/OrderHistory';

@EntityRepository(OrderHistory)
export class OrderHistoryRepository extends Repository<OrderHistory> {}
