import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {catchError, map} from 'rxjs/operators';
import {ProductImageEntity} from '../../../entity/db/buy/ProductImageEntity';


@Injectable()
export class ProductImageService {

  constructor(
    private http: HttpClient
  ) { }


  getAll( search?: any, productId?: string,  page?: Page<ProductImageEntity> ): Observable<Page<ProductImageEntity>> {

    let vparams: HttpParams = new HttpParams();

    if (page) {
      vparams = vparams.append('page', (page.number - 1 ).toString() );
      vparams = vparams.append('size', page.size.toString() );
    }

    return this.http.get<Page<ProductImageEntity>>(environment.apiURL + 'rest/data/buy/productimage/' + productId, {params: vparams})
      .pipe(
        map(value => {
          return new Page<ProductImageEntity>(value, page);
        }),
        catchError(err => of(null))
      );
  }

  findOne( id: string ): Observable<ProductImageEntity> {
    return this.http.get<ProductImageEntity>(environment.apiURL + 'rest/data/buy/product/' + id);
  }


  delete( id: string ): Observable<void> {
    return this.http.delete<void>(environment.apiURL + 'rest/data/buy/product/' + id  );
  }

  post(product: ProductImageEntity): Observable<ProductImageEntity> {

    return this.http.post<ProductImageEntity>(environment.apiURL + 'rest/data/buy/product', product );

  }

  put( product: ProductImageEntity ): Observable<void> {

    return this.http.put<void>(environment.apiURL + 'rest/data/buy/product', product );

  }
}
