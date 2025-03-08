import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { CircularProgress } from "../../common";
import { AssignmentSubmissionForm } from "../../components";

const AssignmentDetails = () => {
  const [assignmentData, setAssignmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(assignmentData);

  const getId = location?.pathname?.split("/").pop();

  const fetchSingleAssignment = async () => {
    try {
      const data = await axios(`${API_URL.ASSIGNMENTS}/${getId}`);
      setAssignmentData(data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSingleAssignment();
  }, [getId, loading]);

  return (
    <div className="w-full h-full">
      {assignmentData ? (
        <>
          <div className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-3 border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {assignmentData?.name}
              </h3>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full w-fit ${
                  assignmentData?.isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {assignmentData?.isCompleted ? "Completed" : "Pending"}
              </span>
            </div>

            <p className="text-gray-600 text-sm">
              {assignmentData?.description}
            </p>

            <p className="text-sm text-gray-500">
              <strong>Due:</strong>{" "}
              {moment(assignmentData?.dueDate).format("DD/MM/YYYY")}
            </p>
          </div>
          {!assignmentData?.isCompleted && (
            <AssignmentSubmissionForm
              assignmentData={assignmentData}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default AssignmentDetails;
