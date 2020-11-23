import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertType } from '@models/enums/alert-type.enum';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Input() type: AlertType = AlertType.info;
  @Input() duration: number; // duration in seconds
  @Output() close = new EventEmitter<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    if (!this.duration) this.duration = 3000;

    const notification = this.notificationService.show({
      content: this.message,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: this.type, icon: true },
      closable: true
    });

    setTimeout(() => {
      notification.hide();
    }, this.duration);

    notification.afterHide.subscribe(() => this.close.emit());
  }
}
