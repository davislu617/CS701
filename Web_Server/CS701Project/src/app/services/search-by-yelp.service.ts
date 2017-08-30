import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, Response } from '@angular/http';
import { ApplicationServerUrl } from './mock-data';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class SearchByYelpService {

  constructor(private jsonp: Jsonp) { }

  search(term: string, location: string): Observable<any> {
    let url: string = ApplicationServerUrl.searchByYelpUrl;

    let params = new URLSearchParams();
    params.set('term', term);
    params.set('location', location);
    params.set('callback', "JSONP_CALLBACK");
    return this.jsonp
               .get(url, {search: params})
               .map((res: Response) => res.json());

  }

}
