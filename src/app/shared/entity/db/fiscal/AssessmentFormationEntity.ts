import {TaxEntity} from './TaxEntity';
import {RegimeFiscalEntity} from './RegimeFiscalEntity';
import {CstEntity} from './CstEntity';
import {CfopEntity} from './CfopEntity';
import {NatureIncomingEntity} from './NatureIncomingEntity';
import {AssessmentFormationSpecialEntity} from './AssessmentFormationSpecialEntity';
import {AssessmentFormationMvaEntity} from './AssessmentFormationMvaEntity';

export class AssessmentFormationEntity {

  id: string;
  tax: TaxEntity;
  name: string;
  regimeFiscal: RegimeFiscalEntity;
  cstInput: CstEntity;
  cstOutput: CstEntity;
  cst: CstEntity;
  cfopInSteteInput: CfopEntity;
  cfopOutSteteInput: CfopEntity;
  cfopOutSteteOutput: CfopEntity;
  cfopInSteteOutput: CfopEntity;
  aliquot: number;
  povertFund: number;
  reductoinCalculation: number;
  natureIncoming: NatureIncomingEntity;
  legalBase: string;
  link: string;
  notes: string;
  aliquotCalc: number;
  aliquotOut: number;
  aliquotOutFisica: number;
  cstOut: CstEntity;

  assessmentFormationSpecial:  Array<AssessmentFormationSpecialEntity>;
  assessmentFormationMva:  Array<AssessmentFormationMvaEntity>;

}
