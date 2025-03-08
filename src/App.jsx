import React from "react";
import "./App.css";
import requireNoAuth from "./common/hoc/requireNoAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_URL } from "./config";
import {
  AssignmentDetails,
  Assignments,
  Dashboard,
  Login,
  Signup,
} from "./pages";
import { requireAuth } from "./common";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_URL.SIGNUP} element={requireNoAuth(Signup)} />
        <Route path={APP_URL.LOGIN} element={requireNoAuth(Login)} />

        <Route path={APP_URL.DASHBOARD} element={requireAuth(Dashboard)} />
        <Route path={APP_URL.ASSIGNMENTS} element={requireAuth(Assignments)} />
        <Route
          path={APP_URL.ASSIGNMENT_DETAILS}
          element={requireAuth(AssignmentDetails)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
