import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {UserAccessEntity} from '../../../entity/db/security/UserAccessEntity';

@Injectable()
export class UserAccessService {

  constructor(
    private http: HttpClient
  ) { }

  putAccess( data: UserAccessEntity  ): Observable<void> {
     return this.http.put<void>(environment.apiURL + 'rest/data/security/useraccess', data);
  }

}
