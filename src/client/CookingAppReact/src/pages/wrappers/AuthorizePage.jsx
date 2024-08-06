import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AuthorizePage({
  onSuccessElement,
  role,
  onFailRedirect,
}) {
  const roleType = useSelector((state) => state.user.role.type);
  return role === roleType ? (
    onSuccessElement
  ) : (
    <Navigate to={onFailRedirect} />
  );
}
