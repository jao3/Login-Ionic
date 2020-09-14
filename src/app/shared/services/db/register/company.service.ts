import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';

import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {CompanyEntity} from '../../../entity/db/register/CompanyEntity';


@Injectable()
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( companyName: string, companyCnpj: string, page: Page<CompanyEntity>): Observable<Page<CompanyEntity>> {

     let vparams: HttpParams = new HttpParams();

     if (companyName && companyName !== '') {
       vparams = vparams.append('name', companyName);
     }

    if (companyCnpj && companyCnpj !== '') {
      vparams = vparams.append('cnpj', companyCnpj);
    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

     return this.http.get<Page<CompanyEntity>>(environment.apiURL + 'rest/data/register/company/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<CompanyEntity>(value);
         }),
         catchError(err => of(null))
       );
  }


}
