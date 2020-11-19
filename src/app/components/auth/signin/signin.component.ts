import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;

    this.loading = true;
    this.authService
      .signin(email, password)
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
