import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthErrors } from '@models/enums/auth-error-codes.enum';
import { IAuthResponseData } from '@models/interfaces/auth-response-data.interface';
import { User } from '@models/user/user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { AlertType } from '@models/enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly localStorageKey = 'userData'; // the key name used to store the user in localStorage
  private readonly apiKey: string = 'AIzaSyC2p-KuBM-BJ2DfWNf7YhzCKLXQuvmPKrM'; // provided bij google firebase
  private tokenExpirationTimer: any; // a timer that auto logs out the user when the session is expired (1 hour on firebase)

  // * BehaviorSubject will enable you to always use the last emitted data by .next() instead of heaving to subscribe
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}

  signin(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(res => {
          this.handleUser(res.email, res.localId, res.idToken, +res.expiresIn);

          this.alertService.broadcast({
            message: 'Welcome back, ' + res.email + '.',
            type: AlertType.success
          });
        })
      );
  }

  signup(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(res => {
          this.handleUser(res.email, res.localId, res.idToken, +res.expiresIn);

          this.alertService.broadcast({
            message: 'Welcome, ' + res.email + '.',
            type: AlertType.success
          });
        })
      );
  }

  // * this method is called by the app component (at startup)
  autoSignin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // check the token validity through the getter user.token
    if (loadedUser.token) {
      this.user.next(loadedUser);

      // * calculate difference in milliseconds between futere date (expiration) and current date
      const expiresIn =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expiresIn);
    }
  }

  private handleUser(
    email: string,
    userId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, idToken, expirationDate);

    // call subject
    this.user.next(user);
    this.autoLogout(expiresIn * 1000); // seconds to milliseconds (firebase to setTimeout)

    // store user to localStorage (to prevent user from being signedout on page refresh)
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
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

    this.alertService.broadcast({
      message: res.message,
      type: AlertType.error
    });

    return throwError(res.message);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem(this.localStorageKey);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);

    this.router.navigate(['/signin']);
  }

  autoLogout(duration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
}
