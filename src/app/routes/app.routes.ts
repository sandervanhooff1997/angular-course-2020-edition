import { Routes } from '@angular/router';
import { RecipeListComponent } from '@components/recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from '@components/shopping-list/shopping-list.component';

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
    component: ShoppingListComponent
  }
];

export default routes;
