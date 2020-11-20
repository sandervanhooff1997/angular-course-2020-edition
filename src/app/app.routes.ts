import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  }
  // {
  //   path: '**',
  //   redirectTo: 'not-found'
  // }
];

export default routes;
