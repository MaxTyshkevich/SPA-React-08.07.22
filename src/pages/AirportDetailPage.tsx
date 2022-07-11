import React from "react";
import { useParams } from "react-router-dom";

const AirportDetailPage = () => {
  const param = useParams<"id">();
  return (
    <div className="container mx-auto pt-5 max-w-[760px]">
      <h1>Airport ID: {param.id}</h1>
    </div>
  );
};

export default AirportDetailPage;
