import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import jwtDecode from 'jwt-decode';
import { environment } from '../../environments/environment';

const JWT_TOKEN_KEY = 'jwt_token';

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const credentials = { username, password }
    return this.http.post(`${this.apiUrl}/users/signin`, credentials, this.httpOptions);
  }

  logout() {
    localStorage.removeItem(JWT_TOKEN_KEY);
  }

  signup(username: string, password: string) {
    const credentials = { username, password }
    return this.http.post(`${this.apiUrl}/users/signup`, credentials, this.httpOptions)
  }

  setToken(token: string, userId: number) {
    localStorage.setItem(JWT_TOKEN_KEY, token);
    localStorage.setItem('user_id', userId.toString());
  }

  getCurrentUserId() {
    const userId = localStorage.getItem('user_id');
    if (!userId) return null

    return userId
  }

  getToken() {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    return token;
  }

  private handleError(error: HttpErrorResponse) {
    console.log('myerror', error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(error.error.desciption);
  };
}
