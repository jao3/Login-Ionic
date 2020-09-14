import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class FileStorageService {



  constructor(
    private http: HttpClient,

  ) { }

  get(fileId: string): Observable<Blob> {
     return this.http.get<Blob>(environment.apiURL + 'rest/data/service/filestorage/' + fileId, {responseType: 'blob' as 'json'} );
  }

}
