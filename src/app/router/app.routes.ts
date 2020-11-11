import { Routes } from '@angular/router';
import { RecipeListComponent } from '@components/recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from '@components/shopping-list/shopping-list.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { AuthGuardService } from '@services/guards/auth-guard.service';
import { CanDeactivateGuard } from '@services/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipeListComponent
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
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

export default routes;
