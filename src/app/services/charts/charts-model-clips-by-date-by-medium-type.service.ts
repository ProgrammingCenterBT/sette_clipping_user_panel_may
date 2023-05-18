import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelClipsByDateByMediumType } from './charts-model-clips-by-date-by-medium-type';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelClipsByDateByMediumTypeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClipsByDateByMediumType() {
    return this.http.get<any[]>(`${this.apiServerUrl}/charts/clips_by_date_by_medium_type_procedure`);
  }
}
