import { Pipe, PipeTransform } from '@angular/core';
import { complementZeros } from '../utils/stringUtils';

@Pipe({
  name: 'minuteSeconds',
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value?: number): string {
    if (!value) return '0';
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + complementZeros(value - minutes * 60);
  }
}
