import {UserEntity} from '../security/UserEntity';
import {StateEntity} from '../register/StateEntity';


export enum AuditorStatus {
  S, // Ativos
  N  // Normal
}


export class AuditorEntity {
  id: string;
  user: UserEntity;
  status: AuditorStatus;
  state: StateEntity;
}
