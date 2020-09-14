import {StateEntity} from '../register/StateEntity';
import {AssessmentFormationEntity} from './AssessmentFormationEntity';

export class AssessmentEntity {

  id: string;
  name: string;
  number: string;
  variation?: string;
  dateStart: Date;
  dateFinish: Date;
  notes: string;
  section: string;
  state: StateEntity;

  assessmentFormation: Array<AssessmentFormationEntity>;

}
