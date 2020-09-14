import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {AuditSolicitationsEntity} from '../../../entity/db/auditfiscal/AuditSolicitationsEntity';
import {SolicitationEntity} from '../../../entity/db/auditfiscal/SolicitationEntity';
import {formatDate} from '@angular/common';


@Injectable()
export class AuditSolicitationsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll( search?: any, pageAuditSolicitations?: Page<AuditSolicitationsEntity> ): Observable<Page<AuditSolicitationsEntity>> {

    let vparams: HttpParams = new HttpParams();

    if (pageAuditSolicitations) {
      vparams = vparams.append('page', (pageAuditSolicitations.number - 1).toString() );
      vparams = vparams.append('size', pageAuditSolicitations.size.toString() );
    }

    return this.http.get<Page<AuditSolicitationsEntity>>(environment.apiURL + 'rest/data/auditfiscal/auditsolicitations/list/' + search.auditId , {params: vparams})
      .pipe(
        map(value => {
          return new Page<AuditSolicitationsEntity>(value, pageAuditSolicitations);
        }),
        catchError(err => of(null))
      );
  }

  postSelected( search: any, auditId: string, page: Page<SolicitationEntity>  ): Observable<any> {

    let vparams: HttpParams = new HttpParams();

    vparams = vparams.append( 'isAllDisplayDataChecked', String( page.isAllDisplayDataChecked) );

    if ( search.number != null) {
      vparams = vparams.append('number', search.number );
    }

    if (search.review != null) {
      vparams = vparams.append('review', search.review);
    }

    if (search.productName  != null) {
      vparams = vparams.append('productName', search.productName);
    }

    if (search.status != null ) {
      vparams = vparams.append('status', search.status );
    }

    if (search.company != null) {
      vparams = vparams.append('companyId', search.company.id);
    }

    if (search.state != null) {
      vparams = vparams.append('stateId', search.state.id );
    }

    if (search.taxSection != null) {
      vparams = vparams.append('taxSection', search.taxSection);
    }

    if (search.productIdentifier != null) {
      vparams = vparams.append('productIdentifier', search.productIdentifier);
    }

    if ( search.productNumber != null) {
      vparams = vparams.append('productNumber', search.productNumber);
    }

    if (search.ncmNumber != null) {
      vparams = vparams.append('ncmNumber', search.ncmNumber);
    }

    if ( search.cestNumber != null) {
      vparams = vparams.append('cestNumber', search.cestNumber);
    }

    if (search.date != null && (  search.date.length > 0 ) ) {
      vparams = vparams.append('dateStart', formatDate( search.date[0], 'yyyy-MM-dd', 'pt' )  );
      vparams = vparams.append('dateFinish', formatDate( search.date[1], 'yyyy-MM-dd', 'pt' ) );
    }

    if (search.own  != null ) {
      vparams = vparams.append('own',  search.own );
    }

    return this.http.post<any>(environment.apiURL + 'rest/data/auditfiscal/auditsolicitations/audit/' + auditId + '/select', page.mapOfCheckedId, {params: vparams } );

  }


  delete( auditSolicitationId: string ): Observable<void> {

    return this.http.delete<void>(environment.apiURL + 'rest/data/auditfiscal/auditsolicitations/' + auditSolicitationId  );

  }


}
