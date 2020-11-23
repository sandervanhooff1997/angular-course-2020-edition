import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { IAlert } from '@models/interfaces/alert.interface';
import { AlertService } from '@services/alert.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'recipes';
  switchValue: number = 5;
  alert: IAlert;
  alertSub: Subscription;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.autoSignin();

    this.alertSub = this.alertService.alert.subscribe(alert => {
      this.alert = alert;
    });
  }

  onCloseAlert() {
    this.alert = null;
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }
}
