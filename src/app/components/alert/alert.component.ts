import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Input() duration?: number; // duration in seconds
  @Output() close = new EventEmitter<void>();
  private timer: any;

  ngOnInit() {
    // auto close
    if (this.duration) {
      // auto close and display the remaining duration
      this.timer = setInterval(() => {
        if (this.duration - 1 > 0) this.duration--;
        else {
          clearInterval(this.timer);
          this.onClose();
        }
      }, 1000);
    }
  }

  onClose() {
    this.close.emit();
  }
}
