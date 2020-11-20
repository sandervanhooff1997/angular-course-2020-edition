import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from '@components/recipes/recipes.component';
import { RecipeListComponent } from '@components/recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from '@components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '@components/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from '@components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from '@components/recipes/recipe-list/recipe-item/recipe-item.component';
import { SharedModule } from '@modules/shared/shared.module';

import routes from './recipes.routes';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    RouterModule.forChild(routes), // ! child module routes must use forChild() instead of forRoot()
    SharedModule
  ]
})
export class RecipesModule {}
