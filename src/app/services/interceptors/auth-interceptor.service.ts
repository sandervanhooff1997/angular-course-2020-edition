import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /**
     * * With the exhaustMap rxjs operator you can chain multiple observables in one method call.
     * * Every exhaustMap uses the output of the previous observable
     * * and replaces the previous observable result by this new observable result
     */
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) return next.handle(req); // return origional request if no user was logged in

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
