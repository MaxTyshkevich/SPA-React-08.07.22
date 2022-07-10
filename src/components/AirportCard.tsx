import React from "react";
import { IAirport } from "../models/models";

interface AirportCardProps {
  airport: IAirport;
}

export const AirportCard = ({ airport }: AirportCardProps) => {
  return <div>{airport.name}</div>;
};
