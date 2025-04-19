import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css'
})
export class CinesComponent {
}
