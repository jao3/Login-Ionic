import {FileStorageEntity} from '../service/FileStorageEntity';

export class ProductImageEntity {
  id: string;
  file: FileStorageEntity;
  main: boolean;
}

