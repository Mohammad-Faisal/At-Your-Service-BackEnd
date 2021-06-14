import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';
import { Order } from './Order';
import { User } from '../../user/entities/User';

@Entity({ name: 'ORDER_HISTORY' })
export class OrderHistory extends BaseEntity {
    @Column({ name: 'REVIEW', nullable: true })
    description: string = '';

    @ManyToOne(type => User, { eager: true })
    updatedBy: any;

    @ManyToOne(type => Order, { eager: true })
    order: any;
}
