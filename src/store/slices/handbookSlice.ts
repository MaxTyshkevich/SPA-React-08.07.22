import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axios from "../../axios";
import {
  IAirport,
  IAirportCountry,
  IAirportRegion,
  IAirportType,
} from "../../models/models";
import airportSlice, { filter } from "./airportSlice";

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

type Filter = IAirportType[] | IAirportRegion[] | IAirportCountry[];

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
  async (_, thinkAPI) => {
    try {
      const responses = await Promise.all(
        Object.values(PathHandbook).map((path: string) => axios.get(path))
      );
      console.log(`test::: `, responses);
      const results = responses.map((response) => response.data);
      return results as Filter[];
    } catch (e) {
      return thinkAPI.rejectWithValue("Some thing went wrong");
    }
  }
);

export const handbookSlice = createSlice({
  name: "handbook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getHandBooks.fulfilled,
      (state, action: PayloadAction<Filter[]>) => {
        state.loading = false;
        state.types = action.payload[0];
        state.regions = action.payload[1];
        state.contries = action.payload[2];
      }
    );
    builder.addCase(getHandBooks.rejected, (state, action) => {
      state.loading = false;
      state.types = [];
      state.regions = [];
      state.contries = [];
    });
  },
});

export default handbookSlice.reducer;
