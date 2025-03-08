import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { APP_URL } from "../../config";
import { registerUser } from "../../redux/slices/userSlice";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    userType: yup.string().required("User type is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleSignup = (data) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(registerUser({ ...data }));
      navigate(APP_URL.LOGIN);
      console.log("Data -->", data);
      reset();
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-200 p-2 sm:p-6 rounded-2xl shadow-xl w-md sm:max-w-md md:max-w-lg">
      <h1 className="uppercase text-center font-bold text-xl sm:text-2xl md:text-3xl mb-6">
        Signup
      </h1>
      <form className="w-full" onSubmit={handleSubmit(handleSignup)}>
        <div className="w-full h-fit mb-4">
          <div className="w-full h-fit">
            <input
              {...register("name")}
              type="text"
              className="outline-none bg-white pl-2.5 py-2 rounded-lg w-full h-fit"
              placeholder="Name *"
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
              type="email"
              className="outline-none bg-white pl-2.5 py-2 rounded-lg w-full h-fit"
              placeholder="Email *"
            />
          </div>
          {errors?.email && (
            <p className="text-xs text-red-600 sm:text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="w-full h-fit mb-4 ">
          <div className="flex items-center gap-x-4">
            <p>
              Occupation <span className="text-red-600">*</span> :
            </p>
            <div className="flex items-center gap-x-4">
              <label className="flex items-center gap-x-1">
                <input
                  {...register("userType")}
                  type="radio"
                  name="userType"
                  value="Student"
                  className="mt-1"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center gap-x-1">
                <input
                  {...register("userType")}
                  type="radio"
                  name="userType"
                  value="Teacher"
                  className="mt-1"
                />
                <span>Teacher</span>
              </label>
            </div>
          </div>
          {errors?.userType && (
            <p className="text-xs text-red-600 sm:text-sm">
              {errors?.userType?.message}
            </p>
          )}
        </div>
        <div className="w-full h-fit mb-4">
          <div className="w-full h-fit">
            <input
              {...register("password")}
              type="password"
              className="outline-none bg-white pl-2.5 py-2 rounded-lg w-full h-fit"
              placeholder="Set Password *"
            />
          </div>
          {errors?.password && (
            <p className="text-xs text-red-600 sm:text-sm">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full mb-2 py-2 ${
            loading ||
            !watch("name") ||
            !watch("email") ||
            !watch("userType") ||
            !watch("password")
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-900 cursor-pointer"
          } text-white rounded-lg `}
          disabled={
            loading ||
            !watch("name") ||
            !watch("email") ||
            !watch("userType") ||
            !watch("password")
          }
        >
          {loading ? "Signing Up..." : "Signup"}
        </button>
        <p className="text-center text-sm">
          <span className="opacity-60">Have an account?</span>{" "}
          <span className="font-semibold opacity-100">
            <Link to={APP_URL.LOGIN}>Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
