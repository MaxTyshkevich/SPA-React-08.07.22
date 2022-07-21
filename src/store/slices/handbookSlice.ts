import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import {
  IAirport,
  IAirportCountry,
  IAirportRegion,
  IAirportType,
} from "../../models/models";

enum PathHandbook {
  types = `/handbooks/airport-types`,
  regions = `/handbooks/regions`,
  countries = `/handbooks/countries`,
}

interface IHandbookState {
  loading: boolean;
  types: IAirportType[];
  regions: IAirportRegion[];
  contries: IAirportCountry[];
}

export interface AirportPayload {
  count: number;
  airports: IAirport[];
}

const initialState: IHandbookState = {
  loading: false,
  types: [],
  regions: [],
  contries: [],
};

export const getHandBooks = createAsyncThunk(
  "handbook/getHandBooks",
  async () => {
    const responses = await Promise.all(
      Object.values(PathHandbook).map((path) => axios.get(path))
    );
    const results = responses.map((response) => response.data);
    return results;
  }
);

export const handbookSlice = createSlice({
  name: "handbook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHandBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.types = action.payload[0];
      state.regions = action.payload[1];
      state.contries = action.payload[2];
    });
  },
});

export default handbookSlice.reducer;
