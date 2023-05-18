import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelClipsByDate } from './charts-model-clips-by-date';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelClipsByDateService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // public return_clips_by_date(): Observable<ChartsModelClipsByDate[]> {
    
  //   console.log('in returnClipsByDate in service');

  //   return this.http.get<ChartsModelClipsByDate[]>(`${this.apiServerUrl}/charts/clips_by_date_procedure`);
  // }

  public getClipsByDate() {
    return this.http.get<any[]>(`${this.apiServerUrl}/charts/clips_by_date_procedure`);
  }
}
