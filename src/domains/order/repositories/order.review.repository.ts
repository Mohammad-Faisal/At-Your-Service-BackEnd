import { EntityRepository, Repository } from 'typeorm';
import { OrderReview } from '../entities/OrderReview';

@EntityRepository(OrderReview)
export class OrderReviewRepository extends Repository<OrderReview> {}
