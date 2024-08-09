import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthorizeRoute = ({ succesPage, requiredRole, unAuthorizedPath }) => {
  const role = useSelector((state) => state.user.role.type);
  console.log(role);
  return requiredRole === role ? (
    succesPage
  ) : (
    <Navigate to={unAuthorizedPath} />
  );
};

export default AuthorizeRoute;
