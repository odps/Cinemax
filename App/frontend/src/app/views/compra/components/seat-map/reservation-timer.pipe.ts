import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reservationTimer' })
export class ReservationTimerPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || value < 0) return '00:00';
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
