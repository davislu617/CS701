import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, Response } from '@angular/http';
import { ApplicationServerUrl } from './mock-data';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private jsonp: Jsonp) { }

  login(username: string, password: string): Observable<any> {
    let url: string = ApplicationServerUrl.loginUrl;

    let params = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    params.set('callback', "JSONP_CALLBACK");

    return this.jsonp
               .get(url, {search: params})
               .map((res: Response) => res.json());

  }

  signup(username: string, password: string, email: string): Observable<any> {
    let url: string = ApplicationServerUrl.signupUrl;

    let params = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    params.set('email', email);
    params.set('callback', "JSONP_CALLBACK");

    return this.jsonp
               .get(url, {search: params})
               .map((res: Response) => res.json());

  }

}
