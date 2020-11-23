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

// send the logged in user to the homepage if they hit a route that can only be visited when there is no logged in user
@Injectable({
  providedIn: 'root'
})
export class UnAuthGuardService implements CanActivate, CanActivateChild {
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
      take(1), // take last value and prevent an ongoing subscription
      map(user => {
        const isAuthenticated = !!user;

        // returning a urlTree is the safe way
        if (isAuthenticated) return this.router.createUrlTree(['/']);

        // return a observable<boolean> reflecting the user being logged in or not
        return true;
      })
      // this is the old way of doing it (this could cause a redirect loop in some use cases)
      // tap(isAuthenticated => this.router.navigate(['/auth/signin']))
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
