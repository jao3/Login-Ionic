import {AssessmentEntity} from './AssessmentEntity';
import {StateEntity} from '../register/StateEntity';

export class AssessmentProductEntity {

  id: string;
  assessment: AssessmentEntity;
  state: StateEntity;
  dateStart: Date;
  dateFinish: Date;
  section: string;
  status: string;

}
