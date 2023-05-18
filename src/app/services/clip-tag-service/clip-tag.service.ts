import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClipTags } from './clip-tag';

@Injectable({
  providedIn: 'root'
})
export class ClipTagsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClipWithAllTags(tagID: number): Observable<ClipTags[]> {
    return this.http.get<ClipTags[]>(`${this.apiServerUrl}/clip-tags/tags_with_clips/${tagID}`)
  // public getClientWithAllTags(clientID: number): Observable<ClipTags[]> {
  //   return this.http.get<ClipTags[]>(`${this.apiServerUrl}/client-tags/client_all_tags/${clientID}`)
  }
}