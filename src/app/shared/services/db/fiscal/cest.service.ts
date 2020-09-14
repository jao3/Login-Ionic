import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {CestEntity} from '../../../entity/db/fiscal/CestEntity';


@Injectable()
export class CestService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( number: string, name: string, ncmId: string,  page: Page<CestEntity>): Observable<Page<CestEntity>> {

    let vparams: HttpParams = new HttpParams();

    if (ncmId && ncmId !== '') {
      vparams = vparams.append('ncmId', ncmId);
    }

    if (name && name !== '') {
      vparams = vparams.append('name', name);
    }

    if (number && number !== '') {
      vparams = vparams.append('number', number);
    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

    return this.http.get<Page<CestEntity>>(environment.apiURL + 'rest/data/fiscal/cest/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<CestEntity>(value, page);
         }),
         catchError(err => of(null))
       );
  }


}
