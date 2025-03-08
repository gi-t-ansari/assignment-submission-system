import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    listAllAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const { listAllAssignments } = assignmentSlice.actions;

export const assignments = (state) => state.assignments.assignments;

export default assignmentSlice.reducer;
