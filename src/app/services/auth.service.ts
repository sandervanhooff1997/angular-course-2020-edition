import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = true;
  // provided bij google firebase
  private apiKey: string = 'AIzaSyC2p-KuBM-BJ2DfWNf7YhzCKLXQuvmPKrM';

  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  }

  signin() {
    this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        this.apiKey,
      {}
    );
  }

  signup() {
    this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        this.apiKey,
      {}
    );
  }

  logout() {
    this.loggedIn = false;
  }
}
