import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../../axios";
import { IConfigFliter } from "../../components/AirportFilter";
import { IAirport, IAirportDetail } from "../../models/models";

interface AirportState {
  loading: boolean;
  error: string;
  count: number;
  airports: IAirport[];
  showAirports: IAirport[];
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
  showAirports: [],
};

export const getAirport = createAsyncThunk<IAirportDetail, string>(
  "airport/getAirport",
  async (id) => {
    try {
      const response = await axios.get(`airports/${id}`);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`AxiosError: `, error.message);
      }
      console.log(`error: `, error);
    }
  }
);

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
      state.showAirports = action.payload.airports;
      state.error = "";
    },
    fetchError: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload.message;
      state.count = 0;
    },
    filter: (state, action: PayloadAction<IConfigFliter>) => {
      const config = action.payload;

      if (config.country === "" && config.region === "" && config.type === "") {
        state.showAirports = [...state.airports];
      } else {
        state.showAirports = state.airports.filter(
          (a) =>
            a.country === config.country ||
            a.region === config.region ||
            a.type === config.type
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAirport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAirport.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { fetching, fetchSucces, fetchError, filter } =
  airportSlice.actions;

export default airportSlice.reducer;
