import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelMedium } from './charts-model-medium';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelMediumService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public return_clips_by_medium(): Observable<ChartsModelMedium[]> {
    
    console.log('in returnClipsByMedium in service');

    return this.http.get<ChartsModelMedium[]>(`${this.apiServerUrl}/charts/clips_by_medium_procedure`);
  }

}
