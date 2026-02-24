import React from 'react';
import './VehicleCard.css'; 
import iconoDeMoto from './imagenes/moto-en-linea.png';
import IconoDeCarr from './imagenes/carro-en-linea.png';

const VehicleCard = ({ vehicle, onEdit, onPay }) => {
  // 1. Lógica para el icono y la clase (sin importar mayúsculas/minúsculas)
  const esMoto = vehicle.tipo?.toLowerCase() === 'moto';
  const tipoClase = esMoto ? 'badge-moto' : 'badge-carro';
  const iconoAMostrar = esMoto ? iconoDeMoto : IconoDeCarr;

  // 2. Función para formatear la fecha que vimos en tu consola
  const formatFecha = (fecha) => {
    if (!fecha) return "No registrada";
    // Convertimos el formato de tu consola a algo legible
    const d = new Date(fecha);
    return d.toLocaleString('es-CO', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="vehicle-card">
      <div className="card-header">
        {/* Icono del vehículo */}
        <span className={`badge ${tipoClase}`}>
          <img src={iconoAMostrar} alt={vehicle.tipo} className='iconoDeCards'/>
        </span>
        
        {/* Contenedor para Placa y Fecha */}
        <div className="info-principal">
          <strong className="plate-number">
            {vehicle.placa ? vehicle.placa.toUpperCase() : 'S/P'}
          </strong>
        </div>
      </div>
      
      <div className="button-group">
        <button 
          className="btn-edit" 
          onClick={() => onEdit(vehicle)}
        >
          EDITAR
        </button>
        <button 
          className="btn-pay" 
          onClick={() => onPay(vehicle.id)}
        >
          PAGAR
        </button>
        
      </div>
      <span className="entry-text">
            Ingreso: {formatFecha(vehicle.horaEntrada)}
          </span>
    </div>
  );
};

export default VehicleCard;