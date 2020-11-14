import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string = 'An error occured.';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // load from route data or default msg
    this.errorMessage = this.route.snapshot.data['message']
      ? this.route.snapshot.data['message']
      : 'An error occured.';
  }
}
