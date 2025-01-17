import React from "react";
import { useNavigate } from "react-router-dom";
import lockImage from "../assets/lock.png"; // Imagem de cadeado

const Card = ({ image, title, path, canAccess }) => {
  const navigate = useNavigate();

  return (
    <div className={`col-md-4 mb-4`} onClick={canAccess ? () => navigate(path) : null} style={{cursor: 'pointer'}}>
      <div className="card border-0 shadow text-center h-100 position-relative">
        <div className="card-body d-flex flex-column justify-content-center align-items-center p-5">
          <img src={image} className="w-25 mb-3" />
          <h5 className="card-title text-orange mb-0">{title}</h5>
          {!canAccess && (
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
              <img src={lockImage} alt="Lock" className="w-25" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;