import {PersonEntity} from '../register/PersonEntity';
import {ProductEntity, ProductType} from '../buy/ProductEntity';
import {CestEntity} from '../fiscal/CestEntity';
import {ModelEntity} from '../buy/ModelEntity';
import {MarkEntity} from '../buy/MarkEntity';
import {StateEntity} from '../register/StateEntity';
import {NcmEntity} from '../fiscal/NcmEntity';
import {RegimeFiscalEntity} from '../fiscal/RegimeFiscalEntity';

export enum SolicitationStatus {
  P, // Pendente
  A, // Auditado
  E, // Em Audotoria
  C,  // Cancelada pelo cliente
  R  // Cancelada pelo cliente
}

export enum SolicitationType {
  R, // Revisão
  N // Inclusão de Produto

}

export enum SolicitationMotiveReview {
  A, // Alteração Tributaria
  E, // Erro De Tributação
  C  // Erro de Cadastral
}


export class SolicitationEntity {
   id?: string;
   status: SolicitationStatus = SolicitationStatus.P;
   productType: ProductType = ProductType.P;
   number: number;
   type: SolicitationType = SolicitationType.N;
   productName: string;
   date: Date;
   productNumber: string;
   productIdentifier: string;
   productReference: string;
   reviewMotive: SolicitationMotiveReview;
   productIdentifierbox: string;
   productProducer: PersonEntity;
   product: ProductEntity;
   productCest: CestEntity;
   productModel: ModelEntity;
   mark: MarkEntity;
   notes: string;
   state: StateEntity;
   regimeFiscal: RegimeFiscalEntity;
   ncm: NcmEntity;
   own: Boolean;
   review: Boolean;
}
