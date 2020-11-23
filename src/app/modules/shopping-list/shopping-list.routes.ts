import { ShoppingEditComponent } from '@components/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '@components/shopping-list/shopping-list.component';
import { CanDeactivateGuard } from '@services/guards/can-deactivate-guard.service';
import { AuthGuardService } from '@services/guards/auth-guard.service';
import { ShoppingListResolverService } from '@services/resolvers/shopping-list-resolver.service';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    resolve: [ShoppingListResolverService],
    canActivate: [AuthGuardService], // protect this route and all child routes with the AuthGuard service
    canActivateChild: [AuthGuardService], // protect all child routes with the AuthGuard service
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
  }
];

export default routes;
