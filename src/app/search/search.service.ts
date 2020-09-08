import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from "rxjs";
import { SearchParams } from './search-params';
import { Flight } from "src/app/search/flight";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTriggered = new Subject<SearchParams>();
  private flightsUrl = 'https://tw-frontenders.firebaseio.com/advFlightSearch.json';

  constructor(private http: HttpClient) { }

  searchedFlights$ = this.searchTriggered.asObservable();

  searchFlights(searchParams: SearchParams) {
    this.searchTriggered.next(searchParams);
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl)
      .pipe(
        tap(),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
