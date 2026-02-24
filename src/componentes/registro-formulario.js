import React, { useState } from 'react';
import './registro-formulario.css';
import carroIcono from './imagenes/carro-en-linea.png';
import motoIcono from './imagenes/moto-en-linea.png';

function RegistroForm({ onAgregarVehiculo }) {
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipo) {
      alert('Selecciona un tipo de vehículo');
      return;
    }

    onAgregarVehiculo({
      placa,
      tipo,
      horaEntrada: new Date(),
    });

    setPlaca('');
    setTipo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputsInfo">
        <label className="labelInput">Placa</label>
        <input
          type="text"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          required
          className="inputInfo"
          placeholder='ABC123'
        />
      </div>

      <div className="inputsInfo">
        <label className="labelInput-tipo2">Tipo de vehículo</label>

        <div className="btnDeTpoDeVehiculo">
          <button
            type="button"
            className={`btnDeIcono ${tipo === 'carro' ? 'activo' : ''}`}
            onClick={() => setTipo('carro')}
          >
            <img
              src={carroIcono}
              alt="Carro"
              className="iconoDeVehiculo"
            />
          </button>

          <button
            type="button"
            className={`btnDeIcono ${tipo === 'moto' ? 'activo' : ''}`}
            onClick={() => setTipo('moto')}
          >
            <img
              src={motoIcono}
              alt="Moto"
              className="iconoDeVehiculo"
            />
          </button>
        </div>
      </div>

      <button type="submit" className="btnRegistro">
        Registrar
      </button>
    </form>
  );
}

export default RegistroForm;


