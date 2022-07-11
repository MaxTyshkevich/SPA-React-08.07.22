import React from "react";
import { useNavigate } from "react-router-dom";
import { IAirport } from "../models/models";

interface AirportCardProps {
  airport: IAirport;
}

export const AirportCard = ({ airport }: AirportCardProps) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/airport/${airport.id}`);
  };

  return (
    <div
      onClick={clickHandler}
      className="border rounded-t-md py-4 px-6 mb-2 hover:shadow-lg hover:transition-all cursor-pointer"
    >
      <p className="text-lg font-bold">{airport.name}</p>
      <p>{airport?.region}</p>
      <p>{airport?.country}</p>
      <p>{airport?.type}</p>
      <p>{airport?.local_code}</p>
    </div>
  );
};
