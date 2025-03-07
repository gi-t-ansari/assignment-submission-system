import { Suspense, lazy } from "react";
import { CircularProgress } from "../../common";

const LazyDashboard = lazy(() => import("./Dashboard"));

export const Dashboard = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyDashboard {...props} />
  </Suspense>
);
