import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

import {UserData} from '../../../entity/app/authentication/UserData';
import {tap} from 'rxjs/operators';

@Injectable()
export class UserService {

  userAccess: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(new UserData());
  access: Observable<UserData> =  this.userAccess.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getParams(): Observable<UserData> {
     return this.http.get<any>(environment.apiURL + 'rest/data/security/user/params').pipe(
       tap(x => {
         this.userAccess.next(x) ;
       })
     );
  }

}
