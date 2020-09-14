import {AuditStatus} from './AuditEntity';
import {SolicitationEntity} from './SolicitationEntity';


export class AuditSolicitationsEntity {
  id: string;
  status: AuditStatus;
  solicitation: SolicitationEntity;
  valid: Boolean;
  notifications: string;

}
