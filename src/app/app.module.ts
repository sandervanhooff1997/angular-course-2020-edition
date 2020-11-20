// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from '@components/header/header.component';

// routes
import appRoutes from './app.routes';

// interceptors
import { HttpInterceptorService } from '@services/interceptors/http-interceptor.service';
import { AuthInterceptorService } from '@services/interceptors/auth-interceptor.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingListModule } from '@modules/shopping-list/shopping-list.module';
import { RecipesModule } from '@modules/recipes/recipes.module';
import { AuthModule } from '@modules/auth/auth.module';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    // components
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
