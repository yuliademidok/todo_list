import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../context/user.context";
import { logout } from "../utils/users.utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await logout();
    setCurrentUser(null);
  }

  return (
    <div>
      <Link to="/current-todos">Current Todos</Link>
      {currentUser ? (
        <Link onClick={signOutHandler} to="/">Logout</Link>
      ) : (
        <Link to="/">Login</Link>
      )}
      <Outlet />
    </div>
  );
};

export default Navigation;
