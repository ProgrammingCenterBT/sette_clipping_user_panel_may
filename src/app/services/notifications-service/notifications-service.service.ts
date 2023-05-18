import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notifications } from './notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNotifications(): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(`${this.apiServerUrl}/notifications/all`);
  }

  public getNotificationByID(notificationID: number): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(`${this.apiServerUrl}/notifications/${notificationID}`)
  }
  public getNotificationsPagination(limit: number, offset: number): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(`${this.apiServerUrl}/notifications/pagination/${limit}/${offset}`);
  }
  public getNotificationByNotificationSubject(notificationSubject: string): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(`${this.apiServerUrl}/notifications/by_notification_subject/${notificationSubject}`)
  }
}
