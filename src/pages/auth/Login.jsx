import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { APP_URL } from "../../config";
import { loginUser, userList } from "../../redux/slices/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const allUsers = useSelector(userList);
  console.log("All Users -->", allUsers);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),

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

  const handleLogin = (data) => {
    setLoading(true);
    setTimeout(() => {
      const findUser = allUsers?.find((ele) => ele?.email === data?.email);
      if (!findUser) {
        alert("User not found. Please Signup.");
        setLoading(false);
      } else if (findUser?.password !== data?.password) {
        alert("Password is incorrect.");
        setLoading(false);
      } else {
        dispatch(loginUser(data));
        navigate(APP_URL.DASHBOARD);
        reset();
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="bg-gray-200 p-2 sm:p-6 rounded-2xl shadow-xl w-md sm:max-w-md md:max-w-lg">
      <h1 className="uppercase text-center font-bold text-xl sm:text-2xl md:text-3xl mb-6">
        Login
      </h1>
      <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
        <div className="w-full h-fit mb-4">
          <div className="w-full h-fit">
            <input
              {...register("email")}
              type="email"
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
            <input
              {...register("password")}
              type="password"
              className="outline-none bg-white pl-2.5 py-2 rounded-lg w-full h-fit"
              placeholder="Enter Password *"
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
            loading || !watch("email") || !watch("password")
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-900 cursor-pointer"
          } text-white rounded-lg `}
          disabled={loading || !watch("email") || !watch("password")}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm">
          <span className="opacity-60">New User? </span>{" "}
          <span className="font-semibold opacity-100">
            <Link to={APP_URL.SIGNUP}>Signup</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
