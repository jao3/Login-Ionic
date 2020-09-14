import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {MarkEntity} from '../../../entity/db/buy/MarkEntity';
import {ModelEntity} from '../../../entity/db/buy/ModelEntity';


@Injectable()
export class ModelService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( name?: string,  mark?: MarkEntity, page?: Page<ModelEntity>): Observable<Page<ModelEntity>> {

    let vparams: HttpParams = new HttpParams();

    if (name && name !== '') {
      vparams = vparams.append('name', name);
    }

    if ( mark ) {
      vparams = vparams.append('markId', mark.id);
    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

    return this.http.get<Page<ModelEntity>>(environment.apiURL + 'rest/data/buy/model/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<ModelEntity>(value, page);
         }),
         catchError(err => of(null))
       );
  }


}
