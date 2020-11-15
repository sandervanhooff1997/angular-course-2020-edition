import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any {
    if (!value.length || !filterString) return value;

    return value.filter(
      x =>
        typeof x[propName] === 'string' &&
        x[propName].toLowerCase().includes(filterString.toLowerCase())
    );
  }
}
