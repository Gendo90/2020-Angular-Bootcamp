import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDist'
})
export class ConvertDistPipe implements PipeTransform {

  transform(value: any, arg: string): any {
      if(!value) return '';

      switch (arg) {
          case ('km'): return value*1.60934;
          case ('m'): return value*1.60934*1000;
          case ('cm'): return value*1.60934*1000*100;
          default:
            throw new Error('That is an unsupported unit type for conversion');
      }
  }

}
