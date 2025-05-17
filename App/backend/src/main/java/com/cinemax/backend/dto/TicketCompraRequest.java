package com.cinemax.backend.dto;

// DTO para encapsular los datos necesarios para la compra de un ticket
public class TicketCompraRequest {
    // Identificador del usuario que realiza la compra
    private Long usuarioId;
    // Identificador de la función seleccionada
    private Long funcionId;
    // Identificador del asiento seleccionado
    private Long asientoId;
    // Método de pago elegido (por ejemplo: tarjeta, PayPal, etc.)
    private String metodoPago;
    // Monto total de la compra
    private Long montoTotal;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getFuncionId() {
        return funcionId;
    }

    public void setFuncionId(Long funcionId) {
        this.funcionId = funcionId;
    }

    public Long getAsientoId() {
        return asientoId;
    }

    public void setAsientoId(Long asientoId) {
        this.asientoId = asientoId;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public Long getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(Long montoTotal) {
        this.montoTotal = montoTotal;
    }
}
