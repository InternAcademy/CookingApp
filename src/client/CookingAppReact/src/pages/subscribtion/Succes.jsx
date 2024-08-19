import useFetchUserStatus from "@/hooks/useFetchUserStatus";
import { useNavigate } from "react-router-dom";
export default function Success() {
  const navigate = useNavigate();
  useFetchUserStatus();
  navigate("/");
  return;
}
