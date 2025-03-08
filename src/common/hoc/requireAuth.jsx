import { Navigate } from "react-router";
import { APP_URL as URLS } from "../../config";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../redux/slices/userSlice";
import Layout from "../layout/Layout";

const requireAuth = (Component) => {
  function AuthHoc(props) {
    const authStatus = useSelector(isAuthenticated);

    return authStatus ? (
      <Layout>
        <Component {...props} />
      </Layout>
    ) : (
      <Navigate to={URLS.LOGIN} />
    );
  }

  return <AuthHoc />;
};
export default requireAuth;
