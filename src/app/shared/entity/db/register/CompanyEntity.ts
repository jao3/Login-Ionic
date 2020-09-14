import {RegimeFiscalEntity} from '../fiscal/RegimeFiscalEntity';

export class CompanyEntity {
  id: string ;
  name: string ;
  document: string;
  trade: string ;
  regimeFiscal: RegimeFiscalEntity;
}
