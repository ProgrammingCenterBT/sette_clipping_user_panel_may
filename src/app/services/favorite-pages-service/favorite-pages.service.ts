import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavoritePages } from './favorite-pages';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritePagesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllFavoritePages(): Observable<FavoritePages[]> {
    return this.http.get<FavoritePages[]>(`${this.apiServerUrl}/favorite_pages/all`);
  }

  public getFavoritePagesByID(favoritePagesID: number): Observable<FavoritePages[]> {
    return this.http.get<FavoritePages[]>(`${this.apiServerUrl}/favorite_pages/${favoritePagesID}`)
  }

  public getFavoritePagesByClient(clientID: number): Observable<FavoritePages[]> {
    return this.http.get<FavoritePages[]>(`${this.apiServerUrl}/favorite_pages/favorite_pages_client/${clientID}`)
    // .pipe(
    //   tap(_ => this.log('fetched data')),
    //   catchError(this.handleError<FavoritePages[]>('getData', []))
    // );
  }
  public getFavoritePagesByClientAndClip(clientID: number,clipId:number): Observable<FavoritePages[]> {
    return this.http.get<FavoritePages[]>(`${this.apiServerUrl}/favorite_pages/favorite_pages_client_clip/${clientID}/${clipId}`);
  }
  public addFavoritePages(favorite_pages: FavoritePages): Observable<FavoritePages> {
    return this.http.post<FavoritePages>(`${this.apiServerUrl}/favorite_pages/add`, favorite_pages);
  }

  public updateFavoritePages(favorite_pages: FavoritePages, favoritePagesID: number): Observable<FavoritePages> {
    return this.http.put<FavoritePages>(`${this.apiServerUrl}/favorite_pages/update/${favoritePagesID}`, favorite_pages);
  }

  public deleteFavoritePages(favoritePagesID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/favorite_pages/delete/${favoritePagesID}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }
}