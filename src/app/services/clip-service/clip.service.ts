import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clip } from './clip';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private headers = null;

  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }
  public getClip(): Observable<Clip[]> {
    return this.http.get<Clip[]>(`${this.apiServerUrl}/clip/all`);
  }

  public getClipByID(clipID: number): Observable<Clip[]> {
    return this.http.get<Clip[]>(`${this.apiServerUrl}/clip/${clipID}`)
  }

  public getLastClip(): Observable<Clip[]> {
    return this.http.get<Clip[]>(`${this.apiServerUrl}/clip/last`)
  }
  
}
