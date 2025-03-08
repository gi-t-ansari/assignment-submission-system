import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  userList: [],
  sessionExpiry: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.userList.push(action.payload);
    },
    loginUser: (state, action) => {
      state.user = state.userList.find(
        (ele) => ele?.email === action.payload?.email
      );
      state.isAuthenticated = true;
      state.sessionExpiry = Date.now() + 60 * 60 * 1000;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.sessionExpiry = null;
    },
    checkSession: (state) => {
      if (state.sessionExpiry && Date.now() > state.sessionExpiry) {
        state.isAuthenticated = false;
        state.user = null;
        state.sessionExpiry = null;
      }
    },
  },
});

export const { loginUser, logoutUser, registerUser, checkSession } =
  userSlice.actions;

export const userList = (state) => state.user.userList;
export const isAuthenticated = (state) => state.user.isAuthenticated;
export const user = (state) => state.user.user;

export default userSlice.reducer;
