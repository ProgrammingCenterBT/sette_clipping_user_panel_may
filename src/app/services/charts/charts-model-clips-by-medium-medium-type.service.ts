import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelClipsByMediumMediumType } from './charts-model-clips-by-medium-medium-type';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelClipsByMediumMediumTypeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMediumByMediumType(): Observable<ChartsModelClipsByMediumMediumType[]>{
      console.log('in return getMediumByMediumType in service');

      return this.http.get<ChartsModelClipsByMediumMediumType[]>(`${this.apiServerUrl}/charts/clips_by_medium_by_medium_type_procedure`);
  }
}
