import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * * this service intercepts each outgoing request and prepends a base url
 */
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // * prevent firebase authentication to fail
    if (req.url.startsWith('https://')) return next.handle(req);

    const url = 'https://angular-course-2020-6811d.firebaseio.com/';
    req = req.clone({
      url: url + req.url
    });
    return next.handle(req).pipe(
      tap(event => {
        // * you can also intercept the response by subscribing to the observable returned from next.handle()
        // if (event.type === HttpEventType.Response)
        //   console.log('A response arrived safely', event.body);
      })
    );
  }
}
