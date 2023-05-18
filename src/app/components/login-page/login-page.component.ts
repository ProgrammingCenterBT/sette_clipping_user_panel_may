import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/clients-login-service/authentication.service';
import { Clients } from 'src/app/services/clients-service/clients';
import { ClientsService } from 'src/app/services/clients-service/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent /* implements OnInit */{
  invalidLogin = false;

  public clientsList: Clients[];
  clients: Clients;
  loginForm: FormGroup;
  username: string;
  password: string;
  sha1 = require('sha-1');
  userNotFound = false;

  constructor(public clientsService: ClientsService, private router: Router, public authService: AuthenticationService) {
    this.clients = new Clients;
  }

  ngOnInit(): void {
    this.getClients();
  }

  logOut() {
    this.authService.logOut();
  }

  checkLogin() {
    let arrayClient:any[] = this.clientsList.filter(Clients=>(Clients.client_username===this.username &&  Clients.client_password=== this.sha1(this.password)));
    if(arrayClient.length==1){
       if (this.authService.authenticate(this.username, 
                                          arrayClient[0].client_username, 
                                          this.sha1(this.password), 
                                          arrayClient[0].client_password, 
                                          arrayClient[0].client_id,
                                          arrayClient[0].is_latin, 
                                          arrayClient[0].follows_clips, 
                                          arrayClient[0].follows_bankruptcies, 
                                          arrayClient[0].follows_tenders, 
                                          arrayClient[0].follows_notifications, 
                                          arrayClient[0].follows_analytics, 
                                          arrayClient[0].validate_until)) 
      {
        this.router.navigate(['/home']);
        this.invalidLogin = false;
      } else {
        this.userNotFound = true;
      }
    }else{
      this.invalidLogin = true;
    }
  }

  public getClients(): void {
    this.clientsService.getAllClients().subscribe(
      {
        next:     (response: Clients[]) => {this.clientsList = response;},
        error:    (error:HttpErrorResponse)    => {console.log(error.message);},// errorHandler 
        complete: ()                           => {console.log("completeHandler");} // completeHandler
      }
    );
  }

}