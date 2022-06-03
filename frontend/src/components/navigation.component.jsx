import { useContext, Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { logout } from "../utils/users.utils";
import { UserContext } from "../context/user.context";
import AddTodoButton from "./add-todo-button.components";
import { NavBar, NavBarItems } from "../app.styles";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <NavBar>
        <NavBarItems>
          <Link to="/current-todos">Current Todos</Link>
          <Link to="/completed-todos">Completed Todos</Link>
          <Link to="/all-todos">All Todos</Link>
          <AddTodoButton />

          {currentUser ? (
            <Link onClick={signOutHandler} to="/">
              Logout
            </Link>
          ) : (
            <Link to="/">Login</Link>
          )}
        </NavBarItems>
      </NavBar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
