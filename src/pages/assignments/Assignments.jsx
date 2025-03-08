import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllAssignments } from "../../redux/slices/assignmentSlice";
import { CircularProgress } from "../../common";
import { AssignmentCard } from "../../components";
import axios from "axios";
import { API_URL } from "../../config";

const Assignments = () => {
  const [allAssignments, setAllAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  console.log("Assignments =>", allAssignments);
  const dispatch = useDispatch();

  const fetchAllAssignments = async () => {
    try {
      const data = await axios(API_URL.ASSIGNMENTS);
      setAllAssignments(data?.data);
      setFilteredAssignments(data?.data);
      dispatch(listAllAssignments(data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllAssignments();
  }, []);

  const handleFilter = (e) => {
    const completedAssignments = allAssignments?.filter(
      (ele) => ele?.isCompleted
    );
    const pendingAssignments = allAssignments?.filter(
      (ele) => !ele?.isCompleted
    );
    const inputValue = e?.target?.value;

    if (inputValue === "completed") {
      setFilteredAssignments(completedAssignments);
    } else if (inputValue === "pending") {
      setFilteredAssignments(pendingAssignments);
    } else {
      setFilteredAssignments(allAssignments);
    }
  };

  return (
    <div className="w-full h-full flex flex-col ">
      <header className="w-full h-fit flex justify-between items-center">
        <h2 className="text-2xl font-semibold  mb-6">Assignments Overview</h2>
        {filteredAssignments && (
          <select
            onChange={handleFilter}
            className="bg-slate-400 text-white rounded px-2 py-1 text-sm outline-none"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        )}
      </header>

      {filteredAssignments ? (
        <div className="w-full min-h-fit  flex flex-wrap gap-4 justify-center pb-6">
          {filteredAssignments?.map((ele) => (
            <AssignmentCard key={ele?.id} data={ele} />
          ))}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Assignments;
