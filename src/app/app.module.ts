import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { CoreModule } from '@modules/core/core.module';
import { SharedModule } from '@modules/shared/shared.module';
import { AppComponent } from './app.component';
import appRoutes from './app.routes';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule, // holds all shared declarations & imports
    CoreModule // used to clean up the app module
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
