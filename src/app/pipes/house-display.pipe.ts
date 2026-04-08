import { Pipe, PipeTransform } from '@angular/core';

// Converts empty house values to "Unknown"
@Pipe({
  name: 'houseDisplay',
  standalone: true
})
export class HouseDisplayPipe implements PipeTransform {
  transform(house: string | null | undefined): string {
    return house?.trim() ? house : 'Unknown';
  }
}