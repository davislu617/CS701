import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(private loginService: LoginService, private router: Router) { }

  // authenticate username and password
  login(username: string, password: string){
    this.loginService.login(username,password)
            .subscribe(result => {
              if(result.isValid){
                // reset localStorage by clear all 
                window.sessionStorage.clear();
                window.localStorage.clear();
                // set user ID in session
                window.sessionStorage.setItem('userID',result.ID);
                this.router.navigate(['profile']);
              }else{
                this.errorMessage = 'Invalid username or password!';
              }
            })
  }

  signup(username: string, password: string, email: string){
    this.loginService.signup(username,password,email)
            .subscribe(result => {
              if(result.insertedCount==1 && result.insertedIds){
                // reset localStorage by clear all 
                window.sessionStorage.clear();
                window.localStorage.clear();
                // get the unique user id for mongoDB, then store it in session
                window.sessionStorage.setItem('userID',result.insertedIds);
                this.router.navigate(['profile']);
              }else{
                this.errorMessage = 'Invalid username or password!';
              }
            })
  }

  ngOnInit() {
  }

}
