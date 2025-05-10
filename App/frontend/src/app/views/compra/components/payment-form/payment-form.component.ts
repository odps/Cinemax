import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface PaymentMethod {
  label: string;
  value: string;
}

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

  paymentMethods: PaymentMethod[] = [
    { label: 'Tarjeta de crédito', value: 'card' },
    { label: 'PayPal', value: 'paypal' },
  ];

  processing: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  submitPayment(): void {
    if (this.paymentData.paymentMethod === 'card') {
      if (!this.validateCardDetails()) {
        return;
      }
    }

    this.processing = true;

    // Simulate payment processing
    setTimeout(() => {
      this.processing = false;
      this.paymentSubmitted.emit(this.paymentData);
    }, 1500);
  }

  cancel(): void {
    this.cancelPayment.emit();
  }

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
