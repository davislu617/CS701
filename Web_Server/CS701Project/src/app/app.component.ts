import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private router: Router) { }

  ngOnInit() {
    let userID = window.sessionStorage['userID'];
    if(!userID){
      // redirect to login page
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['profile']);
    }
  }

  logoff(){
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

}
