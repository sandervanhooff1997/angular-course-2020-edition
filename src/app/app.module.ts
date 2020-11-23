import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { CoreModule } from '@modules/core/core.module';
import { SharedModule } from '@modules/shared/shared.module';
import { AppComponent } from './app.component';
import appRoutes from './app.routes';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthComponent],
  imports: [
    // * this preloadStrategy loads the main bundle first (which is small because we lazy-load our modules)
    // * but then in idle allso preloads all other modules one by one
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule, // holds all shared declarations & imports
    CoreModule // used to clean up the app module
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
