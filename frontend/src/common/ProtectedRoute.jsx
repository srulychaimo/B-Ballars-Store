import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (adminOnly && !userInfo.isAdmin) {
      navigate("/");
      return;
    }
  }, [userInfo, navigate, adminOnly, children]);

  return children;
};

export default ProtectedRoute;
