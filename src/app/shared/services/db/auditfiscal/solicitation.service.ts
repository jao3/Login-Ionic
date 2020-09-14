import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {SolicitationEntity} from '../../../entity/db/auditfiscal/SolicitationEntity';
import {catchError, map} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AuditSolicitationsEntity} from '../../../entity/db/auditfiscal/AuditSolicitationsEntity';


@Injectable()
export class SolicitationService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(  search?: any,
            page?: Page<SolicitationEntity>): Observable<Page<SolicitationEntity>> {

     let vparams: HttpParams = new HttpParams();

    if ( search.number != null ) {
      vparams = vparams.append('number', search.number);
    }

    if ( search.review != null ) {
      vparams = vparams.append('review', search.review );
    }

    if ( search.productName != null ) {
       vparams = vparams.append('productName', search.productName);
     }

    if ( search.status  != null ) {
       vparams = vparams.append('status', search.status );
     }

    if ( search.company  != null  ) {
       vparams = vparams.append('companyId',  search.company.id);
     }

    if ( search.state != null ) {
       vparams = vparams.append('stateId', search.state.id );
     }

    if ( search.taxSection != null ) {
       vparams = vparams.append('taxSection', search.taxSection );
     }

    if ( search.productIdentifier != null  ) {
       vparams = vparams.append('productIdentifier', search.productIdentifier);
     }

    if ( search.productNumber != null  ) {
      vparams = vparams.append('productNumber', search.productNumber);
    }

    if ( search.ncmNumber != null  ) {
      vparams = vparams.append('ncmNumber', search.ncmNumber);
    }

    if ( search.cestNumber != null ) {
      vparams = vparams.append('cestNumber', search.cestNumbe );
    }

    if ( search.date != null   &&    search.date.length > 0   ) {
      vparams = vparams.append('dateStart', formatDate( search.date[0], 'yyyy-MM-dd', 'pt' )  );
      vparams = vparams.append('dateFinish', formatDate( search.date[1], 'yyyy-MM-dd', 'pt' ) );
    }

    if ( search.own != null ) {
      vparams = vparams.append('own',  search.own  );
    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1 ).toString() );
      vparams = vparams.append('size', page.size.toString() );
    }

    return this.http.get<Page<SolicitationEntity>>(environment.apiURL + 'rest/data/auditfiscal/solicitation', {params: vparams})
       .pipe(
         map(value => {
           return new Page<SolicitationEntity>(value, page);
         }),
         catchError(err => of(null))
       );
  }

  put( auditSolicitations: AuditSolicitationsEntity ): Observable<void> {

    return this.http.put<void>(environment.apiURL + 'rest/data/auditfiscal/solicitation/' + auditSolicitations.solicitation.id + '/auditsolicitation', auditSolicitations );

  }

}
