import React, { useEffect } from "react";

import { AirportCard } from "../components/AirportCard";
import { AirportFilter } from "../components/AirportFilter";
import { AirportSearch } from "../components/AirportSearch";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { fetchAirport } from "../store/actions/actionsAction";

const MainPage = () => {
  const dispath = useAppDispatch();
  const { airports, error, loading } = useAppSelector((state) => state.airport);

  useEffect(() => {
    dispath(fetchAirport());
  }, []);

  return (
    <div className="container mx-auto max-w-[760px] pt-5">
      <AirportSearch />
      <AirportFilter />

      {airports.map((airport) => (
        <AirportCard key={airport.id} airport={airport} />
      ))}
    </div>
  );
};

export default MainPage;
