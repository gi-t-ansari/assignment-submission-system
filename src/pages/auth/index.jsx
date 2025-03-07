import { Suspense, lazy } from "react";
import { CircularProgress } from "../../common";

const LazyLogin = lazy(() => import("./Login"));
const LazySignup = lazy(() => import("./Signup"));

export const Login = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyLogin {...props} />
  </Suspense>
);

export const Signup = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazySignup {...props} />
  </Suspense>
);
