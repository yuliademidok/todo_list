import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "./store/user/user.selector";

export const ProtectedRoute = () => {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser ? <Outlet /> : <Navigate to="login" />;
};

export const AuthorizedRoute = () => {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser ? <Navigate to="current-todos" /> : <Outlet />;
};

export const IndexRoute = () => {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser ? (
    <Navigate to="current-todos" />
  ) : (
    <Navigate to="login" />
  );
};
