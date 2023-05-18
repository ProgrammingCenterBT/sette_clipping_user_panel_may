import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartModelMediumType } from './charts-model-medium-type';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelMediumTypeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMediumsType(): Observable<ChartModelMediumType[]>{
      return this.http.get<ChartModelMediumType[]>(`${this.apiServerUrl}/charts/clips_by_medium_type_procedure`);
  }

}
