import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

// directives
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { DropdownDirective } from './directives/dropdown.directive';

// routes
import appRoutes from '@app/router/app.routes';
import { RouterModule } from '@angular/router';
import { RecipeStartComponent } from '@components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '@components/recipes/recipe-edit/recipe-edit.component';

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

    // directives
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
