import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

}




