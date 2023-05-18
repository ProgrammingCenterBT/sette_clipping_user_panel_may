import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tenders } from './tenders';

@Injectable({
  providedIn: 'root'
})
export class TendersService {

    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getTenders(): Observable<Tenders[]> {
      return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/all`);
    }
  
    public getTenderByID(tenderID: number): Observable<Tenders[]> {
      return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/${tenderID}`)
    }
    public getTendersPagination(limit: number, offset: number): Observable<Tenders[]> {
      return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/pagination/${limit}/${offset}`);
    }
    public getTendersUtilPagination(until:string, limit: number, offset: number): Observable<Tenders[]> {
      return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/pagination/${until}/${limit}/${offset}`);
    }
    public getTenderByTenderSubject(tenderSubject: string): Observable<Tenders[]> {
      return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/by_tender_subject/${tenderSubject}`)
    }
  }