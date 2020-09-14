import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';

import {Page} from '../../../entity/app/utils/Page';
import {StateEntity} from '../../../entity/db/register/StateEntity';
import {catchError, map} from 'rxjs/operators';


@Injectable()
export class StateService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( stateName: string,  pageState: Page<StateEntity>): Observable<Page<StateEntity>> {

     let vparams: HttpParams = new HttpParams();

     if (stateName && stateName !== '') {
       vparams = vparams.append('stateName', stateName);
     }

    if (pageState) {
      vparams = vparams.append('page', (pageState.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

     return this.http.get<Page<StateEntity>>(environment.apiURL + 'rest/data/register/state/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<StateEntity>(value, pageState);
         }),
         catchError(err => of(null))
       );
  }


}
