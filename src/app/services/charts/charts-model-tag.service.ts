import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelTag } from './charts-model-tag';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelTagService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public return_clips_by_tag(): Observable<ChartsModelTag[]> {
    
    console.log('in returnClipsByTag in service');

    return this.http.get<ChartsModelTag[]>(`${this.apiServerUrl}/charts/clips_by_tag_procedure`);
  }
}
