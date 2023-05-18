import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelTagByMedium } from './charts-model-tag-by-medium';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelTagByMediumService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClipsTagByMedium(): Observable<ChartsModelTagByMedium[]> {
    return this.http.get<ChartsModelTagByMedium[]>(`${this.apiServerUrl}/charts/clips_by_tag_by_medium_procedure`);
  }
}
