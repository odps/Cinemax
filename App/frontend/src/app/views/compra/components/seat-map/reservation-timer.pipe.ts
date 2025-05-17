import { Pipe, PipeTransform } from '@angular/core';

// Pipe para mostrar el temporizador de reserva en formato mm:ss
@Pipe({ name: 'reservationTimer' })
export class ReservationTimerPipe implements PipeTransform {
  transform(value: number): string {
    // Si el valor es nulo o negativo, retorna 00:00
    if (value == null || value < 0) return '00:00';
    // Calcula minutos y segundos a partir de los segundos totales
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
