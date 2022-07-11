import { AppDispatch } from "..";

import axios from "../../axios";
import { IAirport, ServerResponse } from "../../models/models";
import {
  AirportPayload,
  fetchError,
  fetching,
  fetchSucces,
} from "../slices/airportSlice";

export const fetchAirport = (page: number = 1, count: number = 50) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetching());
      const response = await axios.get<ServerResponse<IAirport>>("airports", {
        params: { count, page },
      });
      const data: AirportPayload = {
        count: response.data.count,
        airports: response.data.results,
      };

      dispatch(fetchSucces(data));
    } catch (error) {
      dispatch(fetchError(error as Error));
    }
  };
};
