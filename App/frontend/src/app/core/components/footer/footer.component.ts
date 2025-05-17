import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  // Componente de pie de página reutilizable para toda la aplicación
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // Obtiene el año actual para mostrarlo en el pie de página
  currentYear: number = new Date().getFullYear();
}
