import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from '@services/interceptors/auth-interceptor.service';
import { HttpInterceptorService } from '@services/interceptors/http-interceptor.service';

@NgModule({
  providers: [
    {
      /**
       * ! interceptors get executed in the order you provide them here
       * * adding HTTP_INTERCEPTORS tag tells angular to call
       * * the intercept method whenever a request leaves the application
       * */
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true // use multiple interceptors
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
