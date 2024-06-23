import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../utils/authority";

const initialState = {
  entity: { accountId: 0, accountName: "", accountBalance: "" },
};

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async (url) => {
    const data = await getRequest(url);
    return data;
  }
);

const ACCOUNT_SAVE_URI = "account";
export const saveAccount = createAsyncThunk(
  "account/saveAccount",
  async (account) => {
    const data =
      account.accountId === ""
        ? await postRequest(ACCOUNT_SAVE_URI, account)
        : await putRequest(ACCOUNT_SAVE_URI + "/" + account.accountId, account);
    return data;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    edited: (state, action) => {
      state.entity[action.payload.name] = action.payload.value;
    },
    created: (state, action) => {
      state.entity = initialState.entity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.entity = { ...current(state.entity), ...action.payload };
        state.status = "done";
      })
      .addCase(saveAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveAccount.fulfilled, (state, action) => {
        state.entity = action.payload;
        state.status = "done";
      });
  },
});

export const { edited, created } = accountSlice.actions;
export default accountSlice.reducer;
