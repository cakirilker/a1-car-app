import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET_CARS, GET_CAR_DETAILS } from '../../constants';
import {
  CarsAPI,
  Car,
  CarsRequest,
  CarsResponse,
} from '../../constants/interfaces';

export const fetchCars = createAsyncThunk<
  CarsResponse,
  CarsRequest | undefined,
  { extra: { api: CarsAPI } }
>(GET_CARS, async (options, { extra: { api } }) => {
  const response = await api.getCars(options);
  return response;
});

export const fetchCarDetail = createAsyncThunk<
  Car,
  number,
  { extra: { api: CarsAPI } }
>(GET_CAR_DETAILS, async (id, { extra: { api } }) => {
  const response = await api.getCar(id);
  return response;
});

export type CarsState = Readonly<{
  data: Array<Car>;
  totalPageCount: number;
  totalCarsCount: number;
  loading: Boolean;
  error: Boolean;
  detail: {
    data?: Car;
    loading: boolean;
    error: boolean;
  };
  favorites: number[];
}>;

const initialState: CarsState = {
  data: [],
  totalCarsCount: 0,
  totalPageCount: 0,
  loading: false,
  error: false,
  detail: {
    loading: false,
    error: false,
  },
  favorites: [],
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearCarDetail(state) {
      state.detail = initialState.detail;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCars.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCars.fulfilled, (state, { payload }) => {
      const { cars, totalCarsCount, totalPageCount } = payload;
      state.data = cars;
      state.totalCarsCount = totalCarsCount;
      state.totalPageCount = totalPageCount;
      state.loading = false;
    });
    builder.addCase(fetchCars.rejected, state => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(fetchCarDetail.pending, state => {
      state.detail.loading = true;
      state.detail.error = false;
    });
    builder.addCase(fetchCarDetail.fulfilled, (state, { payload }) => {
      state.detail.data = payload;
      state.detail.loading = false;
    });
    builder.addCase(fetchCarDetail.rejected, state => {
      state.detail.error = true;
      state.detail.loading = false;
    });
  },
});

export const { clearCarDetail } = carsSlice.actions;

export default carsSlice.reducer;
