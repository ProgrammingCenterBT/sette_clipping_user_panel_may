import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientTags } from './client-tags';

@Injectable({
  providedIn: 'root'
})
export class ClientTagsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClientWithAllTags(clientID: number): Observable<ClientTags[]> {
    return this.http.get<ClientTags[]>(`${this.apiServerUrl}/client-tags/client_all_tags/${clientID}`)
  }
}