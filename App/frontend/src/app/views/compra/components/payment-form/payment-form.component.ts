import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Interfaz para los métodos de pago disponibles
interface PaymentMethod {
  label: string;
  value: string;
}

// Estructura de los datos requeridos para el pago
export interface PaymentData {
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  @Output() paymentSubmitted = new EventEmitter<PaymentData>();
  @Output() cancelPayment = new EventEmitter<void>();

  paymentData: PaymentData = {
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: '',
    paymentMethod: 'card',
  };

  // Métodos de pago disponibles para el usuario
  paymentMethods: PaymentMethod[] = [
    { label: 'Tarjeta de crédito', value: 'card' },
    { label: 'PayPal', value: 'paypal' },
  ];

  // Estado para mostrar el spinner de procesamiento
  processing: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  // Envía el formulario de pago, validando los datos según el método seleccionado
  submitPayment(): void {
    if (this.paymentData.paymentMethod === 'card') {
      if (!this.validateCardDetails()) {
        return;
      }
    }

    this.processing = true;

    // Simulación de procesamiento de pago
    setTimeout(() => {
      this.processing = false;
      this.paymentSubmitted.emit(this.paymentData);
    }, 1500);
  }

  // Emite el evento para cancelar el pago
  cancel(): void {
    this.cancelPayment.emit();
  }

  // Valida los datos de la tarjeta antes de enviar el pago
  private validateCardDetails(): boolean {
    if (
      !this.paymentData.cardNumber ||
      this.paymentData.cardNumber.length < 15
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, introduce un número de tarjeta válido',
      });
      return false;
    }

    if (!this.paymentData.cardholderName) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre del titular es obligatorio',
      });
      return false;
    }

    if (
      !this.paymentData.expirationDate ||
      !this.paymentData.expirationDate.match(/^\d{2}\/\d{2}$/)
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formato de fecha de expiración inválido (MM/AA)',
      });
      return false;
    }

    if (!this.paymentData.cvv || this.paymentData.cvv.length < 3) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Introduce un código CVV válido',
      });
      return false;
    }

    return true;
  }
}
