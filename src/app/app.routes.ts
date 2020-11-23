import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('@modules/recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    // lazy loading each feature module
    path: 'shopping-list',
    loadChildren: () =>
      import('@modules/shopping-list/shopping-list.module').then(
        m => m.ShoppingListModule
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

export default routes;
