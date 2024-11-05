import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipei',
  standalone: true
})
export class PipeiPipe implements PipeTransform {

  transform(value: string, isBattle: boolean = false): string {
    if (typeof value !== 'string') {
      return value; 
    }

    const replacedValue = value.replace(/[ao]/gi, 'x');

    if (isBattle) {
      return replacedValue.charAt(0).toUpperCase() + replacedValue.slice(1);
    } else {
      return replacedValue.toUpperCase();
    }
  }
}
