import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {MarkEntity} from '../../../entity/db/buy/MarkEntity';


@Injectable()
export class MarkService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( name?: string,  page?: Page<MarkEntity>): Observable<Page<MarkEntity>> {

    let vparams: HttpParams = new HttpParams();

    if (name && name !== '') {
      vparams = vparams.append('name', name);
    }


    if (page) {
      vparams = vparams.append('page', (page.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

    return this.http.get<Page<MarkEntity>>(environment.apiURL + 'rest/data/buy/mark/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<MarkEntity>(value, page);
         }),
         catchError(err => of(null))
       );
  }


}
