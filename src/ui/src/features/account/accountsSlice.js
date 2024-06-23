import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../utils/authority";
import { first } from "lodash";

const initialState = {
  entities: [],
  totalRecords: 0,
  first: 0,
  page: 0,
  perPage: 10,
  filters: {},
  sortField: "",
  sortOrder: "",
};

const ACCOUNTS_URI = "accounts";
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (na, extra) => {
    const { page, perPage, sortField, sortOrder, filters } =
      extra.getState().accounts;
    const data = await postRequest(
      ACCOUNTS_URI +
        `?page=${
          page + 1
        }&per_page=${perPage}&sort_by=${sortField}&order=${sortOrder}`,
      filters
    );
    return data;
  }
);

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialState,
  reducers: {
    pageChanged: (state, action) => {
      console.log("Cahgne page ", action.payload);
      state.first = action.payload.first;
      state.page = action.payload.page;
    },
    sorted: (state, action) => {
      state.sortField = action.payload.sortField;
      state.sortOrder = action.payload.sortOrder;
    },
    filterEdited: (state, action) => {
      state.filters[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.entities = action.payload.rows;
        state.totalRecords = action.payload.totalRecords;
        state.page = action.payload.currentPage;
        state.status = "done";
      });
  },
});

export const { pageChanged, sorted, filterEdited } = accountsSlice.actions;
export default accountsSlice.reducer;
