import {UserEntity} from '../../db/security/UserEntity';
import {CompanyEntity} from '../../db/register/CompanyEntity';
import {AuditorEntity} from '../../db/auditfiscal/AuditorEntity';

export class UserData {
  id: string;
  user: UserEntity;
  company: CompanyEntity;
  auditor: AuditorEntity;
}
