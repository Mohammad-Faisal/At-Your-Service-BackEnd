import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';
import { User } from '../../user/entities/User';

export enum ServiceType {
    CAR_REPAIR = 'CAR_REPAIR',
    CARPENTRY = 'CARPENTRY',
    CLEANING = 'CLEANING',
    DEMOLITION = 'DEMOLITION',
    HOME_IMPROVEMENT = 'HOME_IMPROVEMENT',
    LANDSCAPING = 'LANDSCAPING',
    MOVING = 'MOVING',
    OTHERS = 'OTHERS',
}

@Entity({ name: 'SERVICE' })
export class Service extends BaseEntity {
    @Column({ name: 'NAME', nullable: false })
    name: string = '';

    @Column({ name: 'DESCRIPTION', default: '' })
    description: string = '';

    @Column({ name: 'PREFERRED_HOUR', default: '' })
    preferredHour: string = '';

    @Column({ name: 'HOURLY_RATE', default: 0 })
    hourlyRate: number = 0;

    @Column({ name: 'AVERAGE_RATING', type: 'float', default: 0.0 })
    averageRating: number = 0;

    @Column({ name: 'ORDER_COUNT', default: 0 })
    orderCount: number = 0;

    @Column({ name: 'RATING_COUNT', default: 0 })
    ratingCount: number = 0;

    @Column({ name: 'TYPE', default: '' })
    type: ServiceType = ServiceType.OTHERS;

    @ManyToOne(type => User, { eager: true })
    provider: any;
}
