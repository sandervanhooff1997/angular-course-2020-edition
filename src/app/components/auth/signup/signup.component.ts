import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    const password2 = form.value.password2;

    if (password != password2) {
      this.errorMessage = "Passwords don't match.";
      return;
    }

    this.loading = true;
    this.authService
      .signup(email, password, password2)
      .subscribe(
        res => {
          form.reset();
        },
        err => (this.errorMessage = err)
      )
      .add(() => {
        this.loading = false;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
  }
}
