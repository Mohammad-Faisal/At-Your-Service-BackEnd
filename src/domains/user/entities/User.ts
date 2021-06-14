import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';

export enum UserType {
  GENERAL_USER = 'GENERAL_USER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

@Entity({ name: 'USER' })
export class User extends BaseEntity {
  @Column({ name: 'NAME', nullable: false })
  name: string = '';

  @Column({ name: 'PHONE', default: '' })
  phone: string = '';

  @Column({ name: 'EMAIL', default: '' })
  email: string = '';

  @Column({ name: 'USER_TYPE', default: '' })
  userType: UserType = UserType.GENERAL_USER;
}
