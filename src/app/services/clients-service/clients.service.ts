import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clients } from './clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.apiServerUrl}/clients/all`);
  }

  public getClientsByID(clientID: number): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.apiServerUrl}/clients/${clientID}`)
  }

}
