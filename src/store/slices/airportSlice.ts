import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAirport } from "../../models/models";

interface AirportState {
  loading: boolean;
  error: string;
  count: number;
  airports: IAirport[];
}

export interface AirportPayload {
  count: number;
  airports: IAirport[];
}

const initialState: AirportState = {
  loading: false,
  error: "",
  count: 0,
  airports: [],
};

export const airportSlice = createSlice({
  name: "airport",
  initialState,
  reducers: {
    fetching: (state) => {
      state.loading = true;
    },
    fetchSucces: (state, action: PayloadAction<AirportPayload>) => {
      state.loading = false;
      state.count = action.payload.count;
      state.airports = action.payload.airports;
      state.error = "";
    },
    fetchError: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload.message;
      state.count = 0;
    },
  },
});

export const { fetching, fetchSucces, fetchError } = airportSlice.actions;

export default airportSlice.reducer;
