import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';
import { User } from '../../user/entities/User';
import { Service } from '../../service/entities/Service';

export enum OrderStatus {
    REQUESTED = 'REQUESTED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    FINISHED = 'FINISHED',
    UNFINISHED = 'UNFINISHED',
}

@Entity({ name: 'ORDER' })
export class Order extends BaseEntity {
    @Column({ name: 'STATUS', nullable: false })
    status: OrderStatus = OrderStatus.REQUESTED;

    @Column({ name: 'REVIEW', nullable: true })
    review: string = '';

    @Column({ name: 'RATING',type:'float', nullable: true })
    rating: number = 0;

    @ManyToOne(type => User, { eager: true })
    orderFrom: any;

    @ManyToOne(type => User, { eager: true })
    orderTo: any;

    @ManyToOne(type => Service, { eager: true })
    service: any;
}
