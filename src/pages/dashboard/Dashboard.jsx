import React from "react";
import { isAuthenticated } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const authStatus = useSelector(isAuthenticated);

  console.log("Authentication", authStatus);

  return <div>Dashboard</div>;
};

export default Dashboard;
