import { RouterModule } from '@angular/router';
import { SignupComponent } from '@components/auth/signup/signup.component';
import { SigninComponent } from '@components/auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import routes from './auth.routes';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModule {}
