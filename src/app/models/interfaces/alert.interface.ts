import { AlertType } from '@models/enums/alert-type.enum';

export interface IAlert {
  message: string;
  type: AlertType;
  duration?: number;
}
