import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { AuthResponseData } from '@models/interfaces/auth-response-data.interface';
import { map, catchError } from 'rxjs/operators';
import { AuthErrors } from '@models/enums/auth-error-codes.enum';
import { User } from '@models/user/user.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = true;
  // provided bij google firebase
  private apiKey: string = 'AIzaSyC2p-KuBM-BJ2DfWNf7YhzCKLXQuvmPKrM';
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError));
  }

  signup(
    email: string,
    password: string,
    password2: string,
    autoSignin: boolean = true
  ) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    if (!res.error.error) return throwError(res.message);

    switch (res.error.error.message) {
      case AuthErrors.EMAIL_NOT_FOUND:
        return throwError('Unknown E-mail.');
      case AuthErrors.INVALID_PASSWORD:
        return throwError('Unauthenticated');
      case AuthErrors.USER_DISABLED:
        return throwError('Your account is disabled.');
      case AuthErrors.EMAIL_EXISTS:
        return throwError('This E-mail is already in use.');
    }

    return throwError(res.message);
  }

  logout() {
    this.loggedIn = false;
  }
}
