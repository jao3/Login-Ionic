

export enum NcmType {
  S,
  B,
  I,
  O,
  P,
  C
}

export class NcmEntity {

  id: string;
  number: string;
  name: string;
  dateStart: Date;
  dateFinish: Date;
  type: NcmType;
  note: string;

}
