import React, { useState } from 'react';
import RegistroForm from './componentes/registro-formulario';
import VehicleCard from './componentes/vehicleCard'; // Cambiado a Mayúscula (PascalCase)
import './App.css';
import logoDePaginaWeb from './isologo-azul-sin-fondo.svg';

function App() {
  // Estado para la lista de vehículos
  const [vehiculos, setVehiculos] = useState([]);
  // Estado para el buscador
  const [busqueda, setBusqueda] = useState('');

  // Función para agregar un vehículo nuevo
  const agregarVehiculo = (vehiculo) => {
    // Le agregamos un ID único y la hora de entrada si no la trae
    const nuevoVehiculo = { 
      ...vehiculo, 
      id: Date.now() 
    };
    setVehiculos([...vehiculos, nuevoVehiculo]);
  };

  // Función para eliminar/pagar vehículo
  const eliminarVehiculo = (id) => {
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  // Filtrar vehículos según la búsqueda
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
          {/* SECCIÓN IZQUIERDA: REGISTRO */}
          <div className="vetana-de-registro">
            <h2 className="titulo-seccion">Entrada de Vehículo</h2>
            <RegistroForm onAgregarVehiculo={agregarVehiculo} />
          </div>

          {/* SECCIÓN DERECHA: LISTADO Y BÚSQUEDA */}
          <div className="vetana-de-matriculas">
            <div className="buscador-de-matriculas">
              <input 
                type="search" 
                className='inputBuscar' 
                placeholder='Buscar placa (ej: ABC123)'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              /> 
              <button className='btnBuscador'>Buscar</button>
            </div>

            <div className="matriculas-registradas">
              {vehiculosFiltrados.length === 0 ? (
                <p className="mensaje-vacio">No hay vehículos que coincidan.</p>
              ) : (
                vehiculosFiltrados.map((v) => (
                  <VehicleCard 
                    key={v.id} 
                    vehicle={v} 
                    onPay={eliminarVehiculo}
                    // onEdit={() => abrirModal(v)} <- Esto lo puedes conectar luego
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