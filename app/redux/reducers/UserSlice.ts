"use client";

import { UserSliceInitialState } from "@/app/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceInitialState = {
  token: null,
};

const UserSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.token = null;
    },
  },
});

export const { loginUser, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
