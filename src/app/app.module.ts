import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF, DatePipe} from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ClientsService } from './services/clients-service/clients.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoPoTagComponent } from './components/info-po-tag/info-po-tag.component';
import { InfoPoTagPieComponent } from './components/info-po-tag-pie/info-po-tag-pie.component';
import { InfoTagMediumComponent } from './components/info-tag-medium/info-tag-medium.component';
import { InfoPoMediumComponent } from './components/info-po-medium/info-po-medium.component';
import { InfoPoDenMediumComponent } from './components/info-po-den-medium/info-po-den-medium.component';
import { InfoPoMediumPercentComponent } from './components/info-po-medium-percent/info-po-medium-percent.component';
import { InfoPoDenTagComponent } from './components/info-po-den-tag/info-po-den-tag.component';
import { OcenetiVestiPodelbaComponent } from './components/oceneti-vesti-podelba/oceneti-vesti-podelba.component';
import { OcenetiVestiProcentiComponent } from './components/oceneti-vesti-procenti/oceneti-vesti-procenti.component';
import { InfoPoAvtorComponent } from './components/info-po-avtor/info-po-avtor.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { BrojNaInfoComponent } from './components/broj-na-info/broj-na-info.component';
import { PartitionedBarChartComponent } from './components/partitioned-bar-chart/partitioned-bar-chart.component';
import { RadarTimelineComponent } from './components/radar-timeline/radar-timeline.component';
import { VestiPoOcenkaComponent } from './components/vesti-po-ocenka/vesti-po-ocenka.component';
import { TenderComponent } from './components/tender/tender.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BankruptciesComponent } from './components/bankruptcies/bankruptcies.component';
import { TenderSidebarComponent } from './components/tender-sidebar/tender-sidebar.component';
import { NotificationsSidebarComponent } from './components/notifications-sidebar/notifications-sidebar.component';
import { BankruptciesSidebarComponent } from './components/bankruptcies-sidebar/bankruptcies-sidebar.component';
import { SalesSidebarComponent } from './components/sales-sidebar/sales-sidebar.component';
import { SalesComponent } from './components/sales/sales.component';
import { FilterPipe, FilterAllResponces,FilterPipeObj,FilterPipeS,FilterPipeNew } from './pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
// import { MatIconModule} from '@angular/material/icon';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
  }

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    LeftSidebarComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    InfoPoTagComponent,
    InfoPoTagPieComponent,
    InfoTagMediumComponent,
    InfoPoMediumComponent,
    InfoPoDenMediumComponent,
    InfoPoMediumPercentComponent,
    InfoPoDenTagComponent,
    OcenetiVestiPodelbaComponent,
    OcenetiVestiProcentiComponent,
    InfoPoAvtorComponent,
    WordCloudComponent,
    BrojNaInfoComponent,
    PartitionedBarChartComponent,
    RadarTimelineComponent,
    VestiPoOcenkaComponent,
    TenderComponent,
    NotificationComponent,
    BankruptciesComponent,
    SalesComponent,
    TenderSidebarComponent, 
    NotificationsSidebarComponent,
   BankruptciesSidebarComponent,
    SalesSidebarComponent,
    FilterPipe,
    FilterAllResponces,
    FilterPipeObj,
    FilterPipeS,
    FilterPipeNew

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    InfiniteScrollModule,
    ScrollingModule,
    


    // MatIconModule, 
    TranslateModule.forRoot({
      defaultLanguage: 'mk',
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
      }),
      HttpClientModule,
  ],
  providers: [ClientsService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
