import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { GET_COLORS, GET_MANUFACTURERS } from '../../constants';
import { CarsAPI, CarsRequest, Manufacturer } from '../../constants/interfaces';

export const fetchColors = createAsyncThunk<
  string[],
  void,
  { extra: { api: CarsAPI } }
>(GET_COLORS, async (_, { extra: { api } }) => {
  const response = await api.getColors();
  return response;
});

export const fetchManufacturers = createAsyncThunk<
  Manufacturer[],
  void,
  { dispatch: AppDispatch; extra: { api: CarsAPI } }
>(GET_MANUFACTURERS, async (_, { extra: { api } }) => {
  const response = await api.getManufacturers();
  return response;
});

export type FiltersState = Readonly<{
  colors: string[];
  manufacturers: Manufacturer[];
  active: CarsRequest;
}>;

const initialState: FiltersState = {
  colors: [],
  manufacturers: [],
  active: {
    page: 1,
    sort: 'asc',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<CarsRequest>) {
      state.active = { ...state.active, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchColors.pending, state => {});
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.colors = action.payload;
    });
    builder.addCase(fetchColors.rejected, state => {});

    builder.addCase(fetchManufacturers.fulfilled, (state, action) => {
      state.manufacturers = action.payload;
    });
  },
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
