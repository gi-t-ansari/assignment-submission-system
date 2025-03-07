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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_URL.SIGNUP} element={requireNoAuth(Signup)} />
        <Route path={APP_URL.LOGIN} element={requireNoAuth(Login)} />

        <Route path={APP_URL.DASHBOARD} element={<Dashboard />} />
        <Route path={APP_URL.ASSIGNMENTS} element={<Assignments />} />
        <Route
          path={APP_URL.ASSIGNMENT_DETAILS}
          element={<AssignmentDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
