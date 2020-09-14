import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';

import {AuditorEntity} from '../../../entity/db/auditfiscal/AuditorEntity';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';


@Injectable()
export class AuditorService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( personName: string,  pageAuditor: Page<AuditorEntity>): Observable<Page<AuditorEntity>> {

     let vparams: HttpParams = new HttpParams();

     if (personName && personName !== '') {
       vparams = vparams.append('personName', personName);
     }

    if (pageAuditor) {
      vparams = vparams.append('page', (pageAuditor.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

     return this.http.get<Page<AuditorEntity>>(environment.apiURL + 'rest/data/auditfiscal/auditor/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<AuditorEntity>(value, pageAuditor);
         }),
         catchError(err => of(null))
       );
  }


}
