import React, { useState } from 'react';
import './ConfigModal.css';

function ConfigModal({ config, setConfig, onClose }) {

  const [minutosGratis, setMinutosGratis] = useState(config.minutosGratis);
  const [valorHora, setValorHora] = useState(config.valorHora);

  const guardarConfiguracion = () => {
    if (minutosGratis < 0 || valorHora < 0) {
      alert('Los valores no pueden ser negativos');
      return;
    }

    setConfig({
      minutosGratis: Number(minutosGratis),
      valorHora: Number(valorHora),
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">

        <h2 className='nombreDeModalDeConfiguracion'>Configuración del Estacionamiento</h2>

        <div className="config-group">
          <label className='labelConfiguracion'>Minutos gratis</label>
          <input
            type="number"
            min="0"
            value={minutosGratis}
            onChange={(e) => setMinutosGratis(e.target.value)}
          />
        </div>

        <div className="config-group">
          <label className='labelConfiguracion'>Valor por hora</label>
          <input
            type="number"
            min="0"
            value={valorHora}
            onChange={(e) => setValorHora(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button
            className="btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="btn-guardar"
            onClick={guardarConfiguracion}
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfigModal;
