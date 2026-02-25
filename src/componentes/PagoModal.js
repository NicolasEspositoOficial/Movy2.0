import React from 'react';
import './PagoModal.css';

function PagoModal({ vehicle, config, onClose, onConfirmarPago }) {

  // =========================
  // CÁLCULOS
  // =========================
  const ahora = new Date();
  const entrada = new Date(vehicle.horaEntrada);

  const diffMs = ahora - entrada;
  const diffMin = Math.floor(diffMs / 60000);

  const minutosCobrables = Math.max(
    diffMin - config.minutosGratis,
    0
  );

  const horasCobrables = Math.ceil(minutosCobrables / 60);

  const totalPagar = horasCobrables * config.valorHora;

  // =========================
  // FORMATO
  // =========================
  const formatoTiempo = () => {
    if (diffMin < 60) return `${diffMin} min`;
    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;
    return `${horas} h ${minutos} min`;
  };

  return (
    <div className="modal-backdrop">
      <div className="modal pago-modal">

        <h2>Resumen de Pago</h2>

        <div className="pago-info">
          <p className='textoDeModalDePago'><strong>Placa:</strong> {vehicle.placa.toUpperCase()}</p>
          <p className='textoDeModalDePago'><strong>Tipo:</strong> {vehicle.tipo}</p>
          <p className='textoDeModalDePago'><strong>Tiempo total:</strong> {formatoTiempo()}</p>
          <p className='textoDeModalDePago'><strong>Minutos gratis:</strong> {config.minutosGratis} min</p>
          <p className='textoDeModalDePago'><strong>Horas cobradas:</strong> {horasCobrables}</p>
          <p className='textoDeModalDePago'><strong>Valor por hora:</strong> ${config.valorHora}</p>

          <hr />

          <p className="total, textoDeModalDePago">
            <strong >Total a pagar:</strong> ${totalPagar}
          </p>
        </div>

        <div className="modal-actions">
          <button
            className="btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="btn-confirmar"
            onClick={() => {
              onConfirmarPago(vehicle.id);
              onClose();
            }}
          >
            Confirmar pago
          </button>
        </div>

      </div>
    </div>
  );
}

export default PagoModal;
