import { Suspense, lazy } from "react";
import { CircularProgress } from "../../common";

const LazyAssignments = lazy(() => import("./Assignments"));
const LazyAssignmentDetails = lazy(() => import("./AssignmentDetails"));

export const Assignments = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyAssignments {...props} />
  </Suspense>
);

export const AssignmentDetails = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyAssignmentDetails {...props} />
  </Suspense>
);
