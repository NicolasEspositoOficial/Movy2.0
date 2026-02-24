import React, { useState, useEffect } from 'react';
import RegistroForm from './componentes/registro-formulario';
import VehicleCard from './componentes/vehicleCard'; 
import './App.css';
import logoDePaginaWeb from './isologo-azul-sin-fondo.svg';

function App() {
  // 1. Modificamos el useState para que inicie buscando en la memoria del navegador
  const [vehiculos, setVehiculos] = useState(() => {
    const memoria = localStorage.getItem('movy_data');
    return memoria ? JSON.parse(memoria) : [];
  });

  const [busqueda, setBusqueda] = useState('');

  // 2. Usamos useEffect para que, cada vez que la lista 'vehiculos' cambie, 
  // se guarde automáticamente en el localStorage
  useEffect(() => {
    localStorage.setItem('movy_data', JSON.stringify(vehiculos));
  }, [vehiculos]);

  const agregarVehiculo = (vehiculo) => {
    const nuevoVehiculo = { 
      ...vehiculo, 
      id: Date.now() 
    };
    setVehiculos([...vehiculos, nuevoVehiculo]);
  };

  const eliminarVehiculo = (id) => {
    // Al filtrar y actualizar el estado, el useEffect de arriba guardará los cambios
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  const vehiculosFiltrados = vehiculos.filter(v => 
    v.placa.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1> 
          <img src={logoDePaginaWeb} alt="logo de movy" className='logoDeSitioweb' /> 
        </h1>
      </header>
      
      <main>
        <div className='container-padre-de-ventanas'>
          <div className="vetana-de-registro">
            <h2 className="titulo-seccion">Entrada de Vehículo</h2>
            <RegistroForm onAgregarVehiculo={agregarVehiculo} />
          </div>

          <div className="vetana-de-matriculas">
            <div className="buscador-de-matriculas">
              <input 
                type="search" 
                className='inputBuscar' 
                placeholder='Buscar por placa'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              /> 
            </div>

            <div className="matriculas-registradas">
              {vehiculosFiltrados.length === 0 ? (
                <p className="mensaje-vacio">Lista vacia.</p>
              ) : (
                vehiculosFiltrados.map((v) => (
                  <VehicleCard 
                    key={v.id} 
                    vehicle={v} 
                    onPay={eliminarVehiculo}
                    onEdit={(veh) => console.log("Editando:", veh)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>Los primeros 15 minutos son gratis.</p>
      </footer>
    </div>
  );
}

export default App;