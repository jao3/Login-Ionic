import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {ProductEntity} from '../../../entity/db/buy/ProductEntity';
import {formatDate} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Injectable()
export class ProductService {


  search: FormGroup = this.fb.group({
    number: new FormControl() ,
    name: this.fb.group({
      tp: new FormControl('IC'),
      value: new FormControl()
    }),
    identifier: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }


  getAll( search?: any, page?: Page<ProductEntity> ): Observable<Page<ProductEntity>> {

    let vparams: HttpParams = new HttpParams();

    if ( search  ) {

      if ( (search.name.value ) && ( search.name.value !== '' ) ) {
        if (search.name.tp === 'IC') {
          vparams = vparams.append('nameStart', search.name.value );
        } else if (search.name.tp === 'TC') {
          vparams = vparams.append('nameFinish', search.name.value );
        } else if (search.name.tp === 'C') {
          vparams = vparams.append('nameContains', search.name.value );
        } else if (search.name.tp === '=') {
          vparams = vparams.append('name', search.name.value );
        }
      }

      if ((  search.identifier  != null ) && ( search.identifier !== '' ) ) {
        vparams = vparams.append('identifier', search.identifier);
      }

      if ((  search.number != null  ) && ( search.number !== '' ) ) {
        vparams = vparams.append('number',  search.number);
      }

      if ((  search.own != null  ) && ( search.own !== '' ) ) {
        vparams = vparams.append('own', search.own  );
      }

      if ((  search.companyIdOwn != null  ) && ( search.companyIdOwn !== '' ) ) {
        vparams = vparams.append('companyIdOwn', search.companyIdOwn  );
      }

    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1 ).toString() );
      vparams = vparams.append('size', page.size.toString() );
    }

    return this.http.get<Page<ProductEntity>>(environment.apiURL + 'rest/data/buy/product', {params: vparams})
      .pipe(
        map(value => {
          return new Page<ProductEntity>(value, page);
        }),
        catchError(err => of(null))
      );
  }

  getAssessmentAll( search?: {assessmentDate: Date,
                             name: {tp: string, value: string},
    identifier: string,
    number: string,
    ncmNumber: string}, page?: Page<ProductEntity> ): Observable<Page<ProductEntity>> {

    let vparams: HttpParams = new HttpParams();

    if ( search  ) {

      if ( (search.name.value ) && ( search.name.value !== '' ) ) {
        if (search.name.tp === 'IC') {
          vparams = vparams.append('nameStart', search.name.value );
        } else if (search.name.tp === 'TC') {
          vparams = vparams.append('nameFinish', search.name.value );
        } else if (search.name.tp === 'C') {
          vparams = vparams.append('nameContains', search.name.value );
        } else if (search.name.tp === '=') {
          vparams = vparams.append('name', search.name.value );
        }
      }

      if ((  search.identifier  != null ) && ( search.identifier !== '' ) ) {
        vparams = vparams.append('identifier', search.identifier);
      }

      if ((  search.number != null  ) && ( search.number !== '' ) ) {
        vparams = vparams.append('number',  search.number);
      }

      if ((  search.ncmNumber != null  ) && ( search.ncmNumber !== '' ) ) {
        vparams = vparams.append('ncmNumber', search.ncmNumber  );
      }

      if ((  search.assessmentDate != null  ) ) {
        vparams = vparams.append('assessmentDate', formatDate( search.assessmentDate , 'yyyy-MM-dd', 'pt' )    );
      }

    }

    if (page) {
      vparams = vparams.append('page', (page.number - 1 ).toString() );
      vparams = vparams.append('size', page.size.toString() );
    }

    return this.http.get<Page<ProductEntity>>(environment.apiURL + 'rest/data/buy/product/assessment', {params: vparams})
      .pipe(
        map(value => {
          return new Page<ProductEntity>(value, page);
        }),
        catchError(err => of(null))
      );
  }

  findOne( id: string ): Observable<ProductEntity> {
    return this.http.get<ProductEntity>(environment.apiURL + 'rest/data/buy/product/' + id);
  }

  findOneAssessment( id: string, assessmentDate: Date ): Observable<ProductEntity> {
    let vparams: HttpParams = new HttpParams();

    vparams = vparams.append('assessmentDate', formatDate( assessmentDate , 'yyyy-MM-dd', 'pt' ) );

    return this.http.get<ProductEntity>(environment.apiURL + 'rest/data/buy/product/assessment/' + id, {params: vparams});
  }

  delete( id: string ): Observable<void> {
    return this.http.delete<void>(environment.apiURL + 'rest/data/buy/product/' + id  );
  }

  post(product: ProductEntity): Observable<ProductEntity> {

    return this.http.post<ProductEntity>(environment.apiURL + 'rest/data/buy/product', product );

  }

  put( product: ProductEntity ): Observable<ProductEntity> {

    return this.http.put<ProductEntity>(environment.apiURL + 'rest/data/buy/product', product );

  }
}
