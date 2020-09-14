import {UserEntity} from './UserEntity';
import {CompanyEntity} from '../register/CompanyEntity';

export class UserAccessEntity {
  id: string ;
  user: UserEntity ;
  company: CompanyEntity;
}
