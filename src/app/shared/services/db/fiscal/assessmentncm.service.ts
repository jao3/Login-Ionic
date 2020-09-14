import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {AssessmentNcmEntity} from '../../../entity/db/fiscal/AssessmentNcmEntity';
import {StateEntity} from '../../../entity/db/register/StateEntity';


@Injectable()
export class AssessmentNcmService {

  constructor(
    private http: HttpClient
  ) { }

  getLookup( ncmNumber: string, state: StateEntity, section: string,  page: Page<AssessmentNcmEntity>): Observable<Page<AssessmentNcmEntity>> {

    let vparams: HttpParams = new HttpParams();

    if (ncmNumber && ncmNumber !== '') {
      vparams = vparams.append('ncmNumber', ncmNumber);
    }

    if (state) {
      vparams = vparams.append('stateId', state.id);
    }

    if (section && section !== '') {
      vparams = vparams.append('section', section);
    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1).toString() );
    } else {
      vparams = vparams.append('page',  '0');
    }

    return this.http.get<Page<AssessmentNcmEntity>>(environment.apiURL + 'rest/data/fiscal/assessmentncm/lookup', {params: vparams})
       .pipe(
         map(value => {
           return new Page<AssessmentNcmEntity>(value, page);
         }),
         catchError(err => of(null))
       );
  }


}
