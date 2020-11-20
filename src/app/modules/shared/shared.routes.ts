import { Routes } from '@angular/router';
import { ErrorPageComponent } from '@components/error/error-page.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: ErrorPageComponent,
    // pass static data to a route
    data: {
      message: '404 - Page not found!'
    }
  }
];

export default routes;
