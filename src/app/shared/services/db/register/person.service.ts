import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {PersonEntity} from '../../../entity/db/register/PersonEntity';


@Injectable()
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( document?: string, name?: string, type?: string, page?: Page<PersonEntity>): Observable<Page<PersonEntity>> {

    let vparams: HttpParams = new HttpParams();

    if (name && name !== '') {
      vparams = vparams.append('name', name);
    }

    if (type && type !== '') {
      vparams = vparams.append('type', type);
    }

    if (document && document !== '') {
      vparams = vparams.append('document', document);
    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

    return this.http.get<Page<PersonEntity>>(environment.apiURL + 'rest/data/register/person/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<PersonEntity>(value, page);
         }),
         catchError(err => of(null))
       );
  }


}
