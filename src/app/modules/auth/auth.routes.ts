import { SigninComponent } from '@components/auth/signin/signin.component';
import { SignupComponent } from '@components/auth/signup/signup.component';
import { UnAuthGuardService } from '@services/guards/unauth-guard.service';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signup',
    canActivate: [UnAuthGuardService],
    component: SignupComponent
  },
  {
    path: 'signin',
    canActivate: [UnAuthGuardService],
    component: SigninComponent
  }
];

export default routes;
