import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, Response } from '@angular/http';

import { ApplicationServerUrl } from './mock-data';
import { TravelPlan } from './model/travelPlan';
import * as travelPlan from './model/mockPlan';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class TravelPlanProvider {

  constructor(private jsonp: Jsonp) { }

  getTravelPlans(): Observable<any>{
      let travelPlanList;
      let url: string = ApplicationServerUrl.getPlanUrl;
      let params = new URLSearchParams();
      let id = window.sessionStorage['userID'];
      params.set('id', id);
      params.set('callback', "JSONP_CALLBACK");
      return this.jsonp
          .get(url, {search: params})
          .map((res:Response) => res.json());
    
  }

  storeTravelPlan(id: string, plan: string): Observable<any>{
    let url: string = ApplicationServerUrl.storePlanUrl;

    let params = new URLSearchParams();
    params.set('id', id);
    params.set('plan', plan);
    params.set('callback', "JSONP_CALLBACK");
    return this.jsonp
               .get(url, {search: params})
               .map((res: Response) => res.json());
  }

  updateTravelPlan(id: string, plan: string): Observable<any>{
    let url: string = ApplicationServerUrl.storePlanUrl;

    let params = new URLSearchParams();
    params.set('id', id);
    params.set('plan', plan);
    params.set('action', 'update');
    params.set('callback', "JSONP_CALLBACK");
    return this.jsonp
               .get(url, {search: params})
               .map((res: Response) => res.json());
  }

}
