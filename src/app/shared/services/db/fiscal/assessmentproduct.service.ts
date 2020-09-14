import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {AssessmentProductEntity} from '../../../entity/db/fiscal/AssessmentProductEntity';
import {formatDate} from '@angular/common';


@Injectable()
export class AssessmentProductService {

  constructor(
    private http: HttpClient
  ) { }

  gerActive(productId: string, date: Date): Observable<Array<AssessmentProductEntity>> {
    let vparams: HttpParams = new HttpParams();

    vparams = vparams.append('date', formatDate( date , 'yyyy-MM-dd', 'pt' ));

    return this.http.get<Array<AssessmentProductEntity>>(environment.apiURL + 'rest/data/fiscal/assessmentproduct/' + productId + '/active', {params: vparams});
  }


}
