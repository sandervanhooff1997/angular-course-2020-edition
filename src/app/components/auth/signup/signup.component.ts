import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AlertService } from '@services/alert.service';
import { AlertType } from '@models/enums/alert-type.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    const password2 = form.value.password2;

    if (password != password2) {
      this.alertService.broadcast({
        message: "Passwords don't match.",
        type: AlertType.error
      });
      return;
    }

    this.loading = true;
    this.authService
      .signup(email, password)
      .subscribe(
        res => {
          form.reset();
          this.router.navigate(['/signin']);
        },
        err => {}
      )
      .add(() => {
        this.loading = false;
      });
  }
}
