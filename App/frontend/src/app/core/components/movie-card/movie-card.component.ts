import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule]
})
export class MovieCardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() releaseDate: string = '';
  @Input() genres: string = '';
  @Input() isHighlighted: boolean = false;
}
