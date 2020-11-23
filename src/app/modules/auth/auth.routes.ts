import { SigninComponent } from '@components/auth/signin/signin.component';
import { SignupComponent } from '@components/auth/signup/signup.component';
import { UnAuthGuardService } from '@services/guards/unauth-guard.service';
import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnAuthGuardService],
    canActivateChild: [UnAuthGuardService],
    component: AuthComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];

export default routes;
