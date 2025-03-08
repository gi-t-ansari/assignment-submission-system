import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { API_URL } from "../../config";
import { Toast } from "../toast";

const AssignmentSubmissionForm = ({ assignmentData, loading, setLoading }) => {
  const [toast, setToast] = useState(null);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Name can only contain alphabets")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name can't exceed 50 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),
    comments: yup
      .string()
      .required("Comment is required")
      .min(3, "Comment must be at least 3 characters")
      .max(1000, "Comment cannot exceed 1000 characters"),
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const submitAssignment = async (data) => {
    setLoading(true);
    try {
      await axios.put(
        `${API_URL.ASSIGNMENTS}/${assignmentData?.id}`,
        {
          isCompleted: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToast({
        message: "Assignment submitted successfully!",
        type: "success",
      });
      reset();
    } catch (err) {
      setToast({ message: "Failed to submit assignment!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <form className="mt-4" onSubmit={handleSubmit(submitAssignment)}>
        <h1 className=" text-center  text-xl sm:text-2xl md:text-3xl mb-6">
          Submit this Assignment
        </h1>
        <div className="w-full h-fit mb-4">
          <div className="w-full h-fit">
            <input
              {...register("name")}
              type="text"
              className="outline-none bg-white pl-2.5 py-2 rounded-lg w-full h-fit"
              placeholder="Enter Name *"
            />
          </div>
          {errors?.name && (
            <p className="text-xs text-red-600 sm:text-sm">
              {errors?.name?.message}
            </p>
          )}
        </div>
        <div className="w-full h-fit mb-4">
          <div className="w-full h-fit">
            <input
              {...register("email")}
              type="text"
              className="outline-none bg-white pl-2.5 py-2 rounded-lg w-full h-fit"
              placeholder="Enter Email *"
            />
          </div>
          {errors?.email && (
            <p className="text-xs text-red-600 sm:text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="w-full h-fit mb-4">
          <div className="w-full h-fit">
            <textarea
              {...register("comments")}
              className="outline-none bg-white pl-2.5 py-2 rounded-lg w-full h-fit"
              placeholder="Enter Comments *"
            />
          </div>
          {errors?.comments && (
            <p className="text-xs text-red-600 sm:text-sm">
              {errors?.comments?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full mb-2 py-2 ${
            loading || !watch("name") || !watch("email") || !watch("comments")
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-900 cursor-pointer"
          } text-white rounded-lg `}
          disabled={
            loading || !watch("name") || !watch("email") || !watch("comments")
          }
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AssignmentSubmissionForm;
