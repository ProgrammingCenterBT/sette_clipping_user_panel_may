import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {  InfoPoTagComponent } from "./components/info-po-tag/info-po-tag.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { AuthGuardService } from "./services/clients-login-service/auth-guard.service";
import { InfoPoMediumComponent } from "./components/info-po-medium/info-po-medium.component";
import { OcenetiVestiPodelbaComponent } from "./components/oceneti-vesti-podelba/oceneti-vesti-podelba.component";
import { InfoPoAvtorComponent } from "./components/info-po-avtor/info-po-avtor.component";
import { WordCloudComponent } from "./components/word-cloud/word-cloud.component";
import { BrojNaInfoComponent } from "./components/broj-na-info/broj-na-info.component";
import { TenderComponent } from "./components/tender/tender.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { BankruptciesComponent } from "./components/bankruptcies/bankruptcies.component";
import { SalesComponent } from "./components/sales/sales.component";

const routes: Routes = [
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent},
  { path: 'home', component: HomeComponent /*, canActivate:[AuthGuardService]*/},
  /*{ path: 'analytics', component: ChartComponent},*/
  { path: 'tenders', component:  TenderComponent},
  { path: 'notifications', component:  NotificationComponent},
  { path: 'bankruptcies', component:  BankruptciesComponent},
  { path: 'sales', component:  SalesComponent},
  { path: 'broj-na-info', component:  BrojNaInfoComponent},
  { path: 'info-po-tag', component:  InfoPoTagComponent},
  { path: 'info-po-medium', component:  InfoPoMediumComponent},
  { path: 'oceneti-vesti', component: OcenetiVestiPodelbaComponent},
  { path: 'info-po-avtor', component: InfoPoAvtorComponent},
  { path: 'word-cloud', component: WordCloudComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
