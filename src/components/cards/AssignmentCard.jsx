import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_URL } from "../../config";

const AssignmentCard = ({ data }) => {
  const navigate = useNavigate();

  const openAssignmentDetails = (e) => {
    e.preventDefault();
    navigate(APP_URL.ASSIGNMENT_DETAILS.replace(":id", data?.id));
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-5 w-80 h-fit flex flex-col gap-3 border border-gray-200 cursor-pointer"
      onClick={openAssignmentDetails}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full w-fit ${
            data.isCompleted
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {data.isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="text-gray-600 text-sm">{data.description}</p>

      <p className="text-sm text-gray-500">
        <strong>Due:</strong> {moment(data?.dueDate).format("DD/MM/YYYY")}
      </p>
    </div>
  );
};

export default AssignmentCard;
