import React from "react";

const AssignmentCard = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-3 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>

      <p className="text-gray-600 text-sm">{data.description}</p>

      <p className="text-sm text-gray-500">
        <strong>Due:</strong> {new Date(data.dueDate).toLocaleDateString()}
      </p>

      <div
        className={`px-3 py-1 text-sm font-semibold rounded-full w-fit ${
          data.isCompleted
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {data.isCompleted ? "Completed ✅" : "Pending ⏳"}
      </div>
    </div>
  );
};

export default AssignmentCard;
