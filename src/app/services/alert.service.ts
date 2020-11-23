import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from '@models/interfaces/alert.interface';
import { AlertType } from '@models/enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert = new Subject<IAlert>();

  constructor() {}

  broadcast(alert: IAlert) {
    this.alert.next(alert);
  }
}
