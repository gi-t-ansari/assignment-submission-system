import { Navigate } from "react-router";
import { isAuthenticated } from "../../redux/slices/userSlice";
import { APP_URL } from "../../config";
import { useSelector } from "react-redux";

const requireNoAuth = (Component) => {
  const authStatus = useSelector(isAuthenticated);

  console.log("Is Authenticated -->", authStatus);

  function NoAuthHoc(props) {
    return authStatus ? (
      <Navigate to={APP_URL.DASHBOARD} />
    ) : (
      <Component {...props} />
    );
  }

  return (
    <div
      className={`w-full min-h-screen px-2 sm:px-4 flex justify-center items-center  bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600`}
    >
      <NoAuthHoc />
    </div>
  );
};
export default requireNoAuth;
