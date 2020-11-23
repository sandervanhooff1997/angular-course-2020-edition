import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { AuthModule } from '@modules/auth/auth.module';
import { CoreModule } from '@modules/core/core.module';
import coreRoutes from '@modules/core/core.routes';
import { RecipesModule } from '@modules/recipes/recipes.module';
import { SharedModule } from '@modules/shared/shared.module';
import { ShoppingListModule } from '@modules/shopping-list/shopping-list.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    RouterModule.forRoot(coreRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule, // holds all shared declarations & imports
    CoreModule // used to clean up the app module
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
