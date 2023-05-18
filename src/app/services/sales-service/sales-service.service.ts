import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sales } from './sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${this.apiServerUrl}/sales/all`);
  }

  public getSalesByID(saleID: number): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${this.apiServerUrl}/sales/${saleID}`)
  }

  public getSalesPagination(limit: number, offset: number): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${this.apiServerUrl}/sales/pagination/${limit}/${offset}`);
  }
  public getSalesBySalesDescription(salesDescription: string): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${this.apiServerUrl}/sales/by_sales_description/${salesDescription}`)
  }
}
