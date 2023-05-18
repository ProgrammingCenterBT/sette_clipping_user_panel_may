import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsModelAuthor } from './charts-model-author';

@Injectable({
  providedIn: 'root'
})
export class ChartsModelAuthorService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public return_clips_by_author(): Observable<ChartsModelAuthor[]> {
    return this.http.get<ChartsModelAuthor[]>(`${this.apiServerUrl}/charts/clips_by_author_procedure`);
  }
}