import { Entity, Column, ManyToOne} from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';
import { Order } from './Order';
import { User } from '../../user/entities/User';

@Entity({ name: 'ORDER_REVIEW' })
export class OrderReview extends BaseEntity {

    @Column({ name: 'REVIEW', nullable: true })
    review: string = '';

    @Column({ name: 'RATING',type:'float', nullable: true })
    rating: number = 0;

    @ManyToOne(type => User, { eager: true })
    reviewFor: any;

    @ManyToOne(type => User, { eager: true })
    reviewBy: any;

    @ManyToOne(type => Order, { eager: true })
    order: any;
}
