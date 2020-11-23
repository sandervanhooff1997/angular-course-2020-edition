import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  // works on current route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1), // ake last value and prevent an ongoing subscription
      map(user => {
        const isAuthenticated = !!user;

        // return a observable<boolean> reflecting the user being logged in or not
        if (isAuthenticated) return true;

        // returning a urlTree is the safe way
        return this.router.createUrlTree(['/auth/signin']);
      })
      // this is the old way of doing it (this could cause a redirect loop in some use cases)
      // tap(isAuthenticated => this.router.navigate(['/signin']))
    );
  }

  // works on all child routes of current route
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }
}
