import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../clients-service/clients.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public clientsService: ClientsService) { }
 

  authenticate(username: string,usernameDB: string, password: string, passwordDB: string, clientID: number, isLatin: boolean,
               viewClips: boolean, viewBankruptcies: boolean, viewTenders: boolean, viewNotifications: boolean, viewAnalytics: boolean, validate_until:string ) {
    if (username === usernameDB && password === passwordDB ) {
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('clientID', clientID.toString())
      sessionStorage.setItem('isLatin', isLatin.toString())
      sessionStorage.setItem('viewClips', viewClips.toString())
      sessionStorage.setItem('viewBankruptcies', viewBankruptcies.toString())
      sessionStorage.setItem('viewTenders', viewTenders.toString())
      sessionStorage.setItem('viewNotifications', viewNotifications.toString())
      sessionStorage.setItem('viewAnalytics', viewAnalytics.toString())
      sessionStorage.setItem('validate_until', validate_until.toString())
      return true;
    } else {
      return false;
    } 
}
  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  }