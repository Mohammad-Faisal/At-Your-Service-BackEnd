import { EntityRepository, Repository } from 'typeorm';
import { UserCredential } from '../entities/UserCredential';


@EntityRepository(UserCredential)
export class UserCredentialRepository extends Repository<UserCredential> {}