import React, { useEffect, useState } from "react";
import { user } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../config";
import { CircularProgress } from "../../common";
import { listAllAssignments } from "../../redux/slices/assignmentSlice";

const Dashboard = () => {
  const [assignmentsData, setAssignmentsData] = useState([]);

  const userDetails = useSelector(user);
  const dispatch = useDispatch();

  const fetchAllAssignments = async () => {
    try {
      const data = await axios(API_URL.ASSIGNMENTS);
      setAssignmentsData(data?.data);
      dispatch(listAllAssignments(data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllAssignments();
  }, []);

  const totalAssignments = assignmentsData.length;
  const submittedAssignments = assignmentsData.filter(
    (a) => a.isCompleted
  ).length;
  const pendingAssignments = totalAssignments - submittedAssignments;

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-4xl  text-center mt-6 mb-12">
        Welcome <span className="font-semibold">{userDetails?.name}</span>
      </h1>
      {totalAssignments && submittedAssignments && pendingAssignments ? (
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-y-4 gap-x-4 items-center">
          {/* Total Assignments */}
          <div className="bg-blue-500 w-72 text-white p-6 rounded-lg text-center shadow-md">
            <h3 className="text-xl font-semibold">Total Assignments</h3>
            <p className="text-3xl font-bold mt-2">{totalAssignments}</p>
          </div>

          {/* Submitted Assignments */}
          <div className="bg-green-500 w-72 text-white p-6 rounded-lg text-center shadow-md">
            <h3 className="text-xl font-semibold">Submitted Assignments</h3>
            <p className="text-3xl font-bold mt-2">{submittedAssignments}</p>
          </div>

          {/* Pending Assignments */}
          <div className="bg-yellow-500 w-72 text-white p-6 rounded-lg text-center shadow-md">
            <h3 className="text-xl font-semibold">Pending Assignments</h3>
            <p className="text-3xl font-bold mt-2">{pendingAssignments}</p>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Dashboard;
