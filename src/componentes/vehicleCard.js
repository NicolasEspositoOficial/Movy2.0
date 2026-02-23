import React from 'react';
import './VehicleCard.css'; // Asegúrate de que el nombre del archivo coincida exactamente

const VehicleCard = ({ vehicle, onEdit, onPay }) => {
  // Determinamos una clase o color según el tipo de vehículo
  const tipoClase = vehicle.tipo === 'Moto' ? 'badge-moto' : 'badge-carro';

  return (
    <div className="vehicle-card">
      <div className="card-header">
        <span className={`badge ${tipoClase}`}>
          {vehicle.tipo}
        </span>
        <strong className="plate-number">
          {vehicle.placa ? vehicle.placa.toUpperCase() : 'S/P'}
        </strong>
      </div>
      
      <div className="button-group">
        <button 
          className="btn-edit" 
          onClick={() => onEdit(vehicle)}
        >
          Editar
        </button>
        <button 
          className="btn-pay" 
          onClick={() => onPay(vehicle.id)}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;