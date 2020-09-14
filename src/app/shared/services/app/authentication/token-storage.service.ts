// @ts-ignore
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenStorageService {

  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('TributalizaDashBoardaccessToken');
    return of(token);
  }

  public getAccessTokenStr(): string {
    const token: string = <string>localStorage.getItem('TributalizaDashBoardaccessToken');
    return token;
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('TributalizaDashBoardrefreshToken');
    return of(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorageService {
    localStorage.setItem('TributalizaDashBoardaccessToken', token);

    return this;
  }

  /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorageService {
    localStorage.setItem('TributalizaDashBoardrefreshToken', token);

    return this;
  }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem('TributalizaDashBoardaccessToken');
    localStorage.removeItem('TributalizaDashBoardrefreshToken');
  }
}
