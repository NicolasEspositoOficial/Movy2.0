import React, { useState, useEffect } from 'react';
import RegistroForm from './componentes/registro-formulario';
import VehicleCard from './componentes/vehicleCard';
import ConfigModal from './componentes/ConfigModal';
import PagoModal from './componentes/PagoModal';
import './App.css';
import logoDePaginaWeb from './isologo-azul-sin-fondo.svg';

function App() {

  // =========================
  // VEHÍCULOS
  // =========================
  const [vehiculos, setVehiculos] = useState(() => {
    const memoria = localStorage.getItem('movy_data');
    return memoria ? JSON.parse(memoria) : [];
  });

  useEffect(() => {
    localStorage.setItem('movy_data', JSON.stringify(vehiculos));
  }, [vehiculos]);

  const agregarVehiculo = (vehiculo) => {
    setVehiculos([
      ...vehiculos,
      { ...vehiculo, id: Date.now() }
    ]);
  };

  const eliminarVehiculo = (id) => {
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  // =========================
  // CONFIGURACIÓN
  // =========================
  const [config, setConfig] = useState(() => {
    const guardado = localStorage.getItem('movy_config');
    return guardado
      ? JSON.parse(guardado)
      : {
          minutosGratis: 15,
          valorHora: 5000,
        };
  });

  useEffect(() => {
    localStorage.setItem('movy_config', JSON.stringify(config));
  }, [config]);

  // =========================
  // BUSCADOR
  // =========================
  const [busqueda, setBusqueda] = useState('');

  const vehiculosFiltrados = vehiculos.filter(v =>
    v.placa.toLowerCase().includes(busqueda.toLowerCase())
  );

  // =========================
  // MODALES
  // =========================
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [vehiculoAPagar, setVehiculoAPagar] = useState(null);

  return (
    <div className="App">

      <header className="App-header">
        <img
          src={logoDePaginaWeb}
          alt="logo"
          className="logoDeSitioweb"
        />
      </header>

      <main>
        <div className="container-padre-de-ventanas">

          <div className="vetana-de-registro">
            <h2 className="titulo-seccion">Entrada de Vehículo</h2>
            <RegistroForm onAgregarVehiculo={agregarVehiculo} />
            <button
          className="btn-config"
          onClick={() => setMostrarConfig(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="iconoDeConfiguracion"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.647 4.081a.724 .724 0 0 0 1.08 .448c2.439 -1.485 5.23 1.305 3.745 3.744a.724 .724 0 0 0 .447 1.08c2.775 .673 2.775 4.62 0 5.294a.724 .724 0 0 0 -.448 1.08c1.485 2.439 -1.305 5.23 -3.744 3.745a.724 .724 0 0 0 -1.08 .447c-.673 2.775 -4.62 2.775 -5.294 0a.724 .724 0 0 0 -1.08 -.448c-2.439 1.485 -5.23 -1.305 -3.745 -3.744a.724 .724 0 0 0 -.447 -1.08c-2.775 -.673 -2.775 -4.62 0 -5.294a.724 .724 0 0 0 .448 -1.08c-1.485 -2.439 1.305 -5.23 3.744 -3.745a.722 .722 0 0 0 1.08 -.447c.673 -2.775 4.62 -2.775 5.294 0zm-2.647 4.919a3 3 0 1 0 0 6a3 3 0 0 0 0 -6" /></svg>
        </button>
          </div>

          <div className="vetana-de-matriculas">
            <input
              type="search"
              className="inputBuscar"
              placeholder="Buscar por placa"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="matriculas-registradas">
              {vehiculosFiltrados.length === 0 ? (
                <p className="mensaje-vacio">Lista vacía.</p>
              ) : (
                vehiculosFiltrados.map((v) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    onPay={() => setVehiculoAPagar(v)}
                  />
                ))
              )}
            </div>
          </div>

        </div>
      </main>

      <footer>
        <p>
          Los primeros {config.minutosGratis} minutos son gratis ·
          Valor hora: ${config.valorHora}
        </p>
      </footer>

      {/* MODAL CONFIGURACIÓN */}
      {mostrarConfig && (
        <ConfigModal
          config={config}
          setConfig={setConfig}
          onClose={() => setMostrarConfig(false)}
        />
      )}

      {/* MODAL PAGO */}
      {vehiculoAPagar && (
        <PagoModal
          vehicle={vehiculoAPagar}
          config={config}
          onClose={() => setVehiculoAPagar(null)}
          onConfirmarPago={eliminarVehiculo}
        />
      )}

    </div>
  );
}

export default App;
