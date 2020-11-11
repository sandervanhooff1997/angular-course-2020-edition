import { Routes } from '@angular/router';
import { RecipeListComponent } from '@components/recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from '@components/shopping-list/shopping-list.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { AuthGuardService } from '@services/auth-guard.service';

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
    canActivate: [AuthGuardService], // protect this route with the AuthGuard service
    component: ShoppingListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export default routes;
