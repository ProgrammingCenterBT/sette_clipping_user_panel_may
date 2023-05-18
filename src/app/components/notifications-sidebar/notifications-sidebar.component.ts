import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notifications-sidebar',
  templateUrl: './notifications-sidebar.component.html',
  styleUrls: ['./notifications-sidebar.component.css']
})
export class NotificationsSidebarComponent implements OnInit {
  // @Input() itemsPerPage;
  // @Input() currentPage;
  // public search: '';

  searchByPublisher:string          = "";
  searchBySubject:string            = "";
  searchByHolder:string             = "";
  @Output() searchByPublisherEvent  = new EventEmitter<string>();
  @Output() searchBySubjectEvent    = new EventEmitter<string>();
  @Output() searchByHolderEvent     = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {}
  addSearchSubject(value: string){this.searchBySubjectEvent.emit(value);}
  addSearchPublisher(value: string){this.searchByPublisherEvent.emit(value);}
  addSearchHolder(value: string){this.searchByHolderEvent.emit(value);}
}

  // notification: Notifications;
  // public notificationList: Notifications[]=[];
 
 
  //  constructor( private notificationService: NotificationsService,) { this.notification = new Notifications();}
 
  //  ngOnInit(): void {
  //    this.getNotifications();
  //  }
  //  public getNotifications(): void {
  //    this.notificationService.getNotifications().subscribe(
  //      (response: Notifications[]) => {
  //        let numberOfNotifications = 0;
  //            numberOfNotifications = response.length;
  //        if (numberOfNotifications > 0) {
  //          this.notificationList = response;
  //           //order by
  //          this.notificationList.sort((a, b) => {
  //            let notification_date_a = a.notification_date;
  //            let notification_date_b = b.notification_date;
 
  //            if (notification_date_a < notification_date_b) return -1;
  //            if (notification_date_a > notification_date_b) return 1;
 
  //            return 0;
  //          })
  //        }
  //      },
  //      (error: HttpErrorResponse) => {
  //        alert(error.message);
  //      }
  //    );
  //  }

  //  onSearchKeyUp(event) {
  //   this.currentPage = 1;
  //   this.search = event.target.value.toLowerCase().trim();
  //   this.getNotifications(this.currentPage - 1, this.itemsPerPage, this.search);
  // }


