import { Routes } from '@angular/router';
import { RecipeListComponent } from '@components/recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from '@components/shopping-list/shopping-list.component';
import { ErrorPageComponent } from '@components/error/error-page.component';
import { AuthGuardService } from '@services/guards/auth-guard.service';
import { CanDeactivateGuard } from '@services/guards/can-deactivate-guard.service';
import { RecipeDetailComponent } from '@components/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from '@components/recipes/recipes.component';
import { RecipeStartComponent } from '@components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '@components/recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
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
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent
      }
    ]
  },
  {
    path: 'shopping-list',
    canActivate: [AuthGuardService], // protect this route and all child routes with the AuthGuard service
    // canActivateChild: [AuthGuardService], // protect all child routes with the AuthGuard service
    canDeactivate: [CanDeactivateGuard],
    component: ShoppingListComponent
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    // pass static data to a route
    data: {
      message: '404 - Page not found!'
    }
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

export default routes;
