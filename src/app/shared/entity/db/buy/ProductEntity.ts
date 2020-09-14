import {PersonEntity} from '../register/PersonEntity';
import {CestEntity} from '../fiscal/CestEntity';
import {CategoryEntity} from './CategoryEntity';
import {ModelEntity} from './ModelEntity';
import {MarkEntity} from './MarkEntity';
import {SectionEntity} from './SectionEntity';
import {ProductImageEntity} from './ProductImageEntity';
import {NcmEntity} from '../fiscal/NcmEntity';
import {AssessmentProductEntity} from '../fiscal/AssessmentProductEntity';

export enum ProductType {
  P, // Produto Final
  S, // Serviço
  H, // HortiFrut
  I, // Produto Industrializado
  O // Outros
}

export class ProductEntity {
  id: string;
  number: string;
  name: string;
  type: ProductType;
  identifier: string;
  reference: string;
  identifierbox: string;
  producer: PersonEntity;
  category: CategoryEntity;
  cest: CestEntity;
  model: ModelEntity;
  mark: MarkEntity;
  section: SectionEntity;
  ncm: NcmEntity;

  images: Array<ProductImageEntity>;
  assessmentProduct: Array<AssessmentProductEntity>;
}

