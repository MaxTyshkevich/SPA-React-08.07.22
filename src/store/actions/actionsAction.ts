import { AppDispatch } from "..";

import axios from "../../axios";
import { IAirport, ServerResponse } from "../../models/models";
import { fetchError, fetching, fetchSucces } from "../slices/airportSlice";

export const fetchAirport = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetching());
      const response = await axios.get<ServerResponse<IAirport>>("airports", {
        params: { count: 50, page: 1 },
      });
      dispatch(fetchSucces(response.data.results));
    } catch (error) {
      dispatch(fetchError(error as Error));
    }
  };
};
