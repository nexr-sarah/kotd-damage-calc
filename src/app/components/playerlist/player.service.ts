import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from "rxjs";

import { IPlayer } from "src/app/interfaces/player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private endpoint = 'https://kotd-api.nexr.repl.co/player';
  constructor(private http: HttpClient) { }

  getPlayers(): Observable<IPlayer[]>{
    return this.http.get<IPlayer[]>(this.endpoint).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
