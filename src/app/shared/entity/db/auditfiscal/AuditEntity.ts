import {StateEntity} from '../register/StateEntity';
import {AuditorEntity} from './AuditorEntity';
import {AssessmentNcmEntity} from '../fiscal/AssessmentNcmEntity';

export enum AuditStatus {
  I, // Iniciada
  C, // Cancelada
  R, // Rejeitada
  A  // Auditado
}

export class AuditEntity {
  id: string;
  auditor: AuditorEntity;
  status: AuditStatus;
  date: Date ;
  dateFinish: Date;
  notes: string;
  taxSection: string;
  state: StateEntity;
  assessmentNcm: AssessmentNcmEntity;
  review: Boolean;

}
