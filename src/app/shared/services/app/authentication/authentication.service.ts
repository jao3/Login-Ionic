import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from 'ngx-auth';

import {TokenStorageService} from './token-storage.service';
import {environment} from '../../../../../environments/environment';
import {Credentials} from '../../../entity/app/authentication/Credentials';
import {UserService} from '../../db/security/user.service';
import {Router} from '@angular/router';

interface AccessData {
  access_token: string;
  refresh_token: string;
}


@Injectable()
export class AuthenticationService implements AuthService {

  private interruptedUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) {

  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable < boolean > {
    return this.tokenStorage
      .getAccessToken()
      .pipe(map(token => !!token));
  }


  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable <string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable <AccessData> {
    return this.tokenStorage
      .getRefreshToken()
      .pipe(
        switchMap((refreshToken: string) => {
          let params: HttpParams = new HttpParams();
          params = params.append( 'grant_type', 'refresh_token' );
          params = params.append( 'refresh_token', refreshToken );


          let headers: HttpHeaders = new HttpHeaders();
          headers = headers.append( 'Authorization', 'basic ' + btoa( 'TributalizaClient:04A774E0F5654998B1BC1E11654D7902'  ) );

          return this.http.post(  environment.authURL + 'oauth/token' , {}, {params: params, headers: headers} )
            .pipe(
              tap((tokens: AccessData) => this.saveAccessData(tokens))
            );

        }),
        tap((tokens: AccessData) => this.saveAccessData(tokens)),
        catchError((err) => {
          this.logout();

          return Observable.throw(err);
        })
      );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/oauth/token');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(credentials: Credentials): Observable<any> {

    let params: HttpParams = new HttpParams();
    params = params.append( 'grant_type', 'password' );
    params = params.append( 'username', credentials.username );
    params = params.append( 'password', credentials.password );

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append( 'Authorization', 'basic ' + btoa( 'TributalizaClient:04A774E0F5654998B1BC1E11654D7902'  ) );


      // login
     return  this.http.post(  environment.authURL + 'oauth/token' , {}, {params: params, headers: headers} )
        .pipe(
          tap((tokens: AccessData) => this.saveAccessData(tokens))
        );
  }



  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
 //   this.userAccess.complete();
    this.router.navigateByUrl('/auth/login');
  }

  /**
   * Save access entity in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({ access_token, refresh_token }: AccessData) {
    this.tokenStorage
      .setAccessToken(access_token)
      .setRefreshToken(refresh_token);
  }

  public skipRequest(req: HttpRequest<any>): boolean {
    return req.url.endsWith('third-party-request');
  }

  public getInterruptedUrl(): string {
    return this.interruptedUrl;
  }

  public setInterruptedUrl(url: string): void {
    this.interruptedUrl = url;
  }



}
