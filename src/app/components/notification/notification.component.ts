import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Tenders } from 'src/app/services/tenders-services/tenders';
import { TendersService } from 'src/app/services/tenders-services/tenders.service';
import { Notifications } from 'src/app/services/notifications-service/notifications';
import { NotificationsService } from 'src/app/services/notifications-service/notifications-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  // @ViewChild('deleteCompanyRef', { static: true }) deleteCompanyRef: DeleteModalComponent;


  clientID = Number(sessionStorage.getItem('clientID'));
 // client_account = sessionStorage.getItem('username');
 
 notification: Notifications;
 public notificationList: Notifications[]=[];
 showMe: boolean;
 filterBySubject:string     = '';
 filterByPublisher:string   = '';
 filterByHolder:string      = '';

 //Infinite scroll
 private offset = 0;
 private limit=50;

  constructor( private notificationService: NotificationsService) { this.notification = new Notifications();}


  ngOnInit(): void {
    this.getNotifications();
    this.pagination(this.limit,this.offset);

  }
  getDataFromSidebarSubject(newItem: string) {this.filterBySubject=newItem;}
  getDataFromSidebarPublisher(newItem: string) {this.filterByPublisher=newItem;}
  getDataFromSidebarHolder(newItem: string) {this.filterByHolder=newItem;}
  public getNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (response: Notifications[]) => {
        let numberOfNotifications = 0;
            numberOfNotifications = response.length;
        if (numberOfNotifications > 0) {
          this.notificationList = response;
           //order by
          this.notificationList.sort((a, b) => {
            let notification_date_a = a.notification_date;
            let notification_date_b = b.notification_date;

            if (notification_date_a < notification_date_b) return -1;
            if (notification_date_a > notification_date_b) return 1;

            return 0;
          })
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  toggleTag() {
    this.showMe = !this.showMe;
  }
  onScrollUp(){
    console.log("Page scroll:"+this.offset);
    this.offset+=this.limit;
    this.pagination(this.limit,this.offset);
   }
   pagination(limit,offset){
     console.log("Pagination "+offset);
     this.notificationService.getNotificationsPagination(limit,offset).subscribe((response: Notifications[]) => {this.notificationList=[];this.notificationList.push(...response);});
   }
   filterData(){
   }

}


