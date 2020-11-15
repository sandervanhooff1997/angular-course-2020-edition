import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, l: number): string {
    let length = 10;
    if (l) length = l; // override by pipe parameter

    // only shorten if necessary
    if (value.length > length) return value.substr(0, l) + '...';

    return value;
  }
}
