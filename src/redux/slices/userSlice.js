import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.userList.push(action.payload);
    },
    loginUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;

export const userList = (state) => state.user.userList;
export const isAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
