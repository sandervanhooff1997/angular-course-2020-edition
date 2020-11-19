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
import { RecipesResolverService } from '@services/resolvers/recipes-resolver.service';
import { ShoppingListResolverService } from '@services/resolvers/shopping-list-resolver.service';
import { ShoppingEditComponent } from '@components/shopping-list/shopping-edit/shopping-edit.component';
import { SigninComponent } from '@components/auth/signin/signin.component';
import { SignupComponent } from '@components/auth/signup/signup.component';
import { UnAuthGuardService } from '@services/guards/unauth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    resolve: [RecipesResolverService],
    canActivate: [AuthGuardService],
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
  },
  {
    path: 'shopping-list',
    resolve: [ShoppingListResolverService],
    canActivate: [AuthGuardService], // protect this route and all child routes with the AuthGuard service
    // canActivateChild: [AuthGuardService], // protect all child routes with the AuthGuard service
    canDeactivate: [CanDeactivateGuard],
    component: ShoppingListComponent,
    children: [
      {
        path: 'new',
        component: ShoppingEditComponent
      },
      {
        path: ':id/edit',
        resolve: [ShoppingListResolverService],
        component: ShoppingEditComponent
      }
    ]
  },
  {
    path: 'signup',
    canActivate: [UnAuthGuardService],
    component: SignupComponent
  },
  {
    path: 'signin',
    canActivate: [UnAuthGuardService],
    component: SigninComponent
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
