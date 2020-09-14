import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {CategoryEntity} from '../../../entity/db/buy/CategoryEntity';


@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( number: string, name: string,  page: Page<CategoryEntity>): Observable<Page<CategoryEntity>> {

    let vparams: HttpParams = new HttpParams();

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

    return this.http.get<Page<CategoryEntity>>(environment.apiURL + 'rest/data/buy/category/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<CategoryEntity>(value, page);
         }),
         catchError(err => of(null))
       );
  }


}
