import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { IAirportDetail } from "../models/models";
import { getAirport } from "../store/slices/airportSlice";

const AirportDetailPage = () => {
  const { id } = useParams<"id">();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.airport);
  const [airportState, getAirportState] = useState<IAirportDetail | null>(null);

  console.log(`airportState: `, airportState);

  useEffect(() => {
    dispatch(getAirport(id as string))
      .unwrap()
      .then((res) => getAirportState(res))
      .catch(() => {
        getAirportState(null);
      });
  }, [dispatch, id]);

  return (
    <div className="container mx-auto pt-5 max-w-[760px]">
      <h1 className="text-center">{airportState?.name}</h1>
      {loading && `Loading...`}
    </div>
  );
};

export default AirportDetailPage;
