import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import { GridModule } from '@progress/kendo-angular-grid';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from '@components/header/header.component';
import { RecipesComponent } from '@components/recipes/recipes.component';
import { RecipeListComponent } from '@components/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from '@components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from '@components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from '@components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '@components/shopping-list/shopping-edit/shopping-edit.component';
import { ErrorPageComponent } from '@components/error/error-page.component';
import { RecipeStartComponent } from '@components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '@components/recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from '@components/auth/signin/signin.component';
import { LoaderComponent } from './components/loader/loader.component';

// directives
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { DropdownDirective } from './directives/dropdown.directive';

// pipes
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';

// routes
import appRoutes from '@app/router/app.routes';

// interceptors
import { HttpInterceptorService } from '@services/interceptors/http-interceptor.service';
import { AuthInterceptorService } from '@services/interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    // components
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ErrorPageComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterPipe,
    SigninComponent,
    SignupComponent,
    LoaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonsModule,
    BrowserAnimationsModule,
    DialogsModule,
    NotificationModule,
    TreeListModule,
    GridModule
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
