import { Routes } from '@angular/router';

import { RecipesResolverService } from '@services/resolvers/recipes-resolver.service';
import { AuthGuardService } from '@services/guards/auth-guard.service';

import { RecipeDetailComponent } from '@components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '@components/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '@components/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '@components/recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    resolve: [RecipesResolverService],
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        resolve: [RecipesResolverService],
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        resolve: [RecipesResolverService],
        component: RecipeEditComponent
      }
    ]
  }
];

export default routes;
