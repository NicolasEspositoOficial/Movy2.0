import React, { useState } from 'react';
import './App.css';

function App() {
  // Aquí vivirán los vehículos registrados
  const [vehiculos, setVehiculos] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVY 2.0</h1>
      </header>
      
      <main>
        {/* Aquí irán tus componentes: Formulario de entrada, Lista de autos, etc. */}
        <div className='container-padre-de-ventanas'>
          <div className="vetana-de-registro">
            <h2 className='titulo-de-bloque'>Completa la información</h2>
            <form action="">
              
            </form>
          </div>
          <div className="vetana-de-matriculas">
            <div className="buscador-de-matriculas">
              <input type="search" name="" id="" /> <input type="submit" value="Buscar" />
            </div>
            <div className="matriculas-registradas">

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