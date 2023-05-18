import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenderTags } from './tenderTags';

@Injectable({
  providedIn: 'root'
})
export class TenderTagsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTagsWithTenders(tagID: number): Observable<TenderTags[]> {
    return this.http.get<TenderTags[]>(`${this.apiServerUrl}/tender-tags/tender_tag/${tagID}`);
  }
}