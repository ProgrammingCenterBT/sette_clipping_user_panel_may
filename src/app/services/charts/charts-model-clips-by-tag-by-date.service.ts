import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelClipsByTagByDate} from './charts-model-clips-by-tag-by-date';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelClipsByTagByDateService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public return_clips_by_tag_by_date(): Observable<ChartsModelClipsByTagByDate[]> {
    console.log('in returnClipsByTagByDate in service');
    return this.http.get<ChartsModelClipsByTagByDate[]>(`${this.apiServerUrl}/charts/clips_by_tag_by_date_procedure`);
  }
}
