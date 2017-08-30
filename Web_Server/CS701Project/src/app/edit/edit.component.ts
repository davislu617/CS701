import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelPlan } from '../services/model/travelPlan';
import { TravelDay } from '../services/model/travelDay';
import { Transport } from '../services/model/transport';
import { Attraction } from '../services/model/attraction';
import { Hotel } from '../services/model/hotel';
import { Other } from '../services/model/other';
import { SearchByYelpService } from '../services/search-by-yelp.service'
import { TravelPlanProvider } from '../services/travel-plan-provider.service'

declare var $:any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  travelPlan: TravelPlan;
  searchResult: any;
  term: string = '';
  location: string ='';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private searchByYelpService: SearchByYelpService,
              private travelPlanProvider: TravelPlanProvider){ 
  }

  ngOnInit() {
    let id = this.route.snapshot.params['planID'];
    if (id && localStorage[id]){
      let plan: TravelPlan = JSON.parse(localStorage[id]);
      for(var item of plan.travelDayList){
        let formattedDate = '';
        let date = new Date(item.date);
        formattedDate += String(date.getMonth()+1);
        formattedDate += '/';
        formattedDate += String(date.getDay());
        formattedDate += '/';
        formattedDate += String(date.getFullYear());
        item.formattedDate = formattedDate;
      }
      this.travelPlan = plan;
      // create tabs for each travel day
      for(var i = 0; i < this.travelPlan.travelDayList.length; i++){
        $('#day'+String(i)+' a').click(function (e) {
          e.preventDefault();
          $(this).tab('show');
        })
      }
      $('#day1').tab('show');
    }else{
      this.router.navigate(['']);
    }
    
    $('.open-popup').click(function(e) {
      e.preventDefault();
      window.open(this.href, '_blank', 'width=300,height=200');
    });
  }

  addDay(index){
    let newDay = new TravelDay();
    let previousDay = this.travelPlan.travelDayList[this.travelPlan.travelDayList.length-1].date;
    let newDate = new Date(previousDay);
    newDate.setDate(newDate.getDate()+1);
    newDay.date = newDate;
    this.travelPlan.travelDayList.push(newDay);
  }

  addTranpsort(index){
    let newTransport = new Transport();
    newTransport.name = '';
    newTransport.detail = '';
    if(!this.travelPlan.travelDayList[index].transportList){
      this.travelPlan.travelDayList[index].transportList = [new Transport];
      this.travelPlan.travelDayList[index].transportList[0] = newTransport;
    }else{
      this.travelPlan.travelDayList[index].transportList.push(newTransport);
    }

  }

  addAttraction(index){
    let newAttraction = new Attraction();
    newAttraction.name = '';
    newAttraction.location = '';
    if(!this.travelPlan.travelDayList[index].attractionList){
      this.travelPlan.travelDayList[index].attractionList = [new Attraction];
      this.travelPlan.travelDayList[index].attractionList[0] = newAttraction;
    }else{
      this.travelPlan.travelDayList[index].attractionList.push(newAttraction);
    }
  }

  addHotel(index){
    let newHotel = new Hotel();
    newHotel.name = '';
    newHotel.location = '';
    this.travelPlan.travelDayList[index].hotel = newHotel;
  }

  addOther(index){
    let newOther = new Other();
    newOther.name = '';
    newOther.detail = '';
    newOther.location = '';
    if(!this.travelPlan.travelDayList[index].otherList){
      this.travelPlan.travelDayList[index].otherList = [new Other];
      this.travelPlan.travelDayList[index].otherList[0] = newOther;
    }else{
      this.travelPlan.travelDayList[index].otherList.push(newOther);
    }
  }

  deleteTransport(i, j){
    this.travelPlan.travelDayList[i].transportList.splice(j, 1);
  }

  deleteAttraction(i, j){
    this.travelPlan.travelDayList[i].attractionList.splice(j, 1);
  }

  deleteHotel(i){
    this.travelPlan.travelDayList[i].hotel = new Hotel();
  }

  deleteOther(i, j){
    this.travelPlan.travelDayList[i].otherList.splice(j, 1);
  }

  searchByYelp(term, location){
    // enable the process bar
    $('#progressBar').html("<div class='progress'>"
                    + '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">'
                    + 'Searching for '+this.term+' in '+this.location+'</div></div>');
    this.searchByYelpService.search(term,location)
            .subscribe(result => {
              if(result){
                this.searchResult = result.businesses;
                $('#progressBar').html('<p>Drag the place into your plan!</p>');
              }
            })
  }

  onDrop(data: any) {
    let index = $('div.active').attr('id');
    // determine the type of new information
    if (this.term.toLowerCase().indexOf("attraction") !== -1) {
      let newAttraction = new Attraction();
      newAttraction.name = data.name;
      newAttraction.location = data.location.address[0]+' '+data.location.city;
      if(!this.travelPlan.travelDayList[index].attractionList){
        this.travelPlan.travelDayList[index].attractionList = [new Attraction];
        this.travelPlan.travelDayList[index].attractionList[0] = newAttraction;
      }else{
        this.travelPlan.travelDayList[index].attractionList.push(newAttraction);
      }
    }else if(this.term.toLowerCase().indexOf("hotel") !== -1){
      let newHotel = new Hotel();
      newHotel.name = data.name;
      newHotel.location = data.location.address[0]+' '+data.location.city;
      this.travelPlan.travelDayList[index].hotel = newHotel;
    }else{
      let newOther = new Other();
      newOther.name = data.name;
      newOther.location = data.location.address[0]+' '+data.location.city;
      newOther.detail = "categories: " + data.categories[0][0] + " | phone: " + data.display_phone;
      if(!this.travelPlan.travelDayList[index].otherList){
        this.travelPlan.travelDayList[index].otherList = [new Other];
        this.travelPlan.travelDayList[index].otherList[0] = newOther;
      }else{
        this.travelPlan.travelDayList[index].otherList.push(newOther);
      }
    }
  }

  save(){
    // update travel plan in localStorage
    window.localStorage.setItem(this.travelPlan.id,JSON.stringify(this.travelPlan));
    // update travel plan in MongoDB
    this.travelPlanProvider.updateTravelPlan(this.travelPlan.id,JSON.stringify(this.travelPlan))
                .subscribe(result => {
                  console.log(result);
                });
  }

}
