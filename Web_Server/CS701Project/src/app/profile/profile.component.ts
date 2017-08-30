import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelPlan } from '../services/model/travelPlan';
import { TravelDay } from '../services/model/travelDay';
import { TravelPlanProvider } from '../services/travel-plan-provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  travelPlanList: TravelPlan[];
  travelPlan: TravelPlan;
  travelDayListOdd: TravelDay[];
  travelDayListEven: TravelDay[];
  showForView: boolean[] = [false,false];
  showForBtn: boolean[] = [true];
  showForAddL: boolean = false;
  
  constructor(private travelPlanProvider: TravelPlanProvider,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // check if there exists local plans
    let isLocalStored = true;
    if(window.localStorage['travelPlanList']){
      for (var item of JSON.parse(window.localStorage['travelPlanList'])){
        if (! window.localStorage[item]){
          isLocalStored = false;
        }
      }
    }else{
      isLocalStored = false;
    }

    if(isLocalStored){
      // get plans from localStorage
      let planIDList = JSON.parse(window.localStorage['travelPlanList']);
      this.travelPlanList = Array<TravelPlan>(planIDList.length);
      for (var i = 0; i < planIDList.length; i++){
        this.travelPlanList[i] = JSON.parse(window.localStorage[planIDList[i]]);
      }
      this.generateElements();
    }else{
      // get plans from MongoDB
      this.travelPlanProvider.getTravelPlans()
            .subscribe(result => {
              if(result){
                this.travelPlanList = Array<TravelPlan>(result.length);
                for (var i = 0; i < result.length; i++){
                  let plan = JSON.parse(result[i].plan);
                  plan.id = result[i]._id;
                  this.travelPlanList[i] = plan;
                }
                this.generateElements();
              }
            });
    }
  }

  generateElements(){
    for (var i = 0; i < this.travelPlanList.length; i++){
      this.showForBtn[i] = true;
    }

    // sort travel plans
    for (let item of this.travelPlanList){
      item.travelDayList.sort((a: TravelDay, b: TravelDay) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    this.travelPlanList.sort((a:TravelPlan, b:TravelPlan)=>{
        return new Date(a.travelDayList[0].date).getTime() - new Date(b.travelDayList[0].date).getTime();
    });
    
    let planIDList = [''];
    for (var i = 0; i < this.travelPlanList.length; i++){
      planIDList[i] = this.travelPlanList[i].id;
    }
    window.localStorage.setItem('travelPlanList',JSON.stringify(planIDList));
    for (var i = 0; i < this.travelPlanList.length; i++){
      window.localStorage.setItem(planIDList[i],JSON.stringify(this.travelPlanList[i]));
    }
  }

  viewPlan(index: number){
    this.travelDayListOdd = [new TravelDay()];
    this.travelDayListEven = [new TravelDay()];

    this.travelPlan = this.travelPlanList[index];
    // sort travel days
    let travelDayList = this.travelPlan.travelDayList.sort((a: TravelDay, b: TravelDay) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    
    // create two lists of travel days displayed in two <div>'s
    for(var i = 0; i < travelDayList.length; i++){
      if(i%2 == 0){
        this.travelDayListEven.push(travelDayList[i]);
      }else{
        this.travelDayListOdd.push(travelDayList[i]);
      }
    }
    this.travelDayListEven.splice(0,1);
    this.travelDayListOdd.splice(0,1);

    // display <div> for view
    this.showForView = [false,false];
    if (travelDayList.length == 1){
      this.showForView[0] = true;
    }
    if (travelDayList.length > 1) {
      this.showForView = [true,true];
    }

    // change the view button into edit button
    for (var i = 0; i < this.travelPlanList.length; i++){
      if(i == index){
        this.showForBtn[i] = false;
      }else{
        this.showForBtn[i] = true;
      }
    }
    
  }

  addTrip(destination,date){
    if(destination && date){
      let newPlan = new TravelPlan();
      newPlan.destination = destination;
      newPlan.travelDayList = [new TravelDay()];
      newPlan.travelDayList[0].date = date;
      let userID = window.sessionStorage['userID'];
      this.travelPlanProvider.storeTravelPlan(userID,JSON.stringify(newPlan))
                .subscribe(result => {
                  window.localStorage.clear();
                  this.router.navigate(['']);
                });
    }
  }

}
