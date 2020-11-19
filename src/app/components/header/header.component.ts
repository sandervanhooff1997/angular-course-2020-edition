import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user/user.model';
import { Subscription } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  user: User;
  userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      /**
       * !user will cast the object to a boolean (true) and then flip it with the ! sign (false).
       * !!user will cast the object to a boolean (true) and then flip it twice with the !! sign (true).
       */
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
