import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from './services/clients-login-service/authentication.service';

import { registerLocaleData } from '@angular/common';
import localeMk from '@angular/common/locales/mk';
import localeEn from '@angular/common/locales/en';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  [x: string]: any;

  public selectedLang: string = 'mk';
  public languages = ['mk', 'en'];

  constructor(public authService: AuthenticationService, public translate: TranslateService){
    registerLocaleData(localeMk, 'mk');
    registerLocaleData(localeEn, 'en');
  }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
  }

  public changeLanguage(newLanguage: string): void {
    this.selectedLang = newLanguage;
    this.translate.use(newLanguage);
  }
  
}

