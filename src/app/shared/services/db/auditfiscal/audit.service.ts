import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {AuditEntity, AuditStatus} from '../../../entity/db/auditfiscal/AuditEntity';
import {UserService} from '../security/user.service';


@Injectable()
export class AuditService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getAll( search?: any, pageAudit?: Page<AuditEntity> ): Observable<Page<AuditEntity>> {

    let vparams: HttpParams = new HttpParams();

    if ( search ) {

      if ((search.auditor != null) ) {
        vparams = vparams.append('auditorId', search.auditor.id);
      }

      if (search.state != null) {
        vparams = vparams.append('stateId', search.state.id);
      }

      if (search.situacao  != null) {
        vparams = vparams.append('status', search.situacao );
      }

      if (search.codigo != null ) {
        vparams = vparams.append('auditNumber', search.codigo );
      }
    }

    if (pageAudit) {
      vparams = vparams.append('page', (pageAudit.number - 1 ).toString() );
      vparams = vparams.append('size', pageAudit.size.toString() );
    }


    return this.http.get<Page<AuditEntity>>(environment.apiURL + 'rest/data/auditfiscal/audit', {params: vparams})
      .pipe(
        map(value => {
          return new Page<AuditEntity>(value, pageAudit);
        }),
        catchError(err => of(null))
      );
  }

  findOne( id: string ): Observable<AuditEntity> {
    return this.http.get<AuditEntity>(environment.apiURL + 'rest/data/auditfiscal/audit/' + id);
  }

  post(): Observable<AuditEntity> {

    let entity: AuditEntity = new AuditEntity();
    entity.status = AuditStatus.I;
    entity.taxSection = 'E';
    entity.state = this.userService.userAccess.value.auditor.state;
    entity.auditor = this.userService.userAccess.value.auditor;
    entity.review = false;

    return this.http.post<AuditEntity>(environment.apiURL + 'rest/data/auditfiscal/audit', entity );

  }

  put( audit: AuditEntity ): Observable<void> {

    return this.http.put<void>(environment.apiURL + 'rest/data/auditfiscal/audit', audit );

  }

  delete( auditId: string ): Observable<void> {

    return this.http.delete<void>(environment.apiURL + 'rest/data/auditfiscal/audit/' + auditId  );

  }

}
