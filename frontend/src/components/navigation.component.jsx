import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { selectCurrentUser } from "../store/user/user.selector";
import { signOutStart } from "../store/user/user.action";
import AddTodoButton from "./add-todo-button.components";
import { NavBar, NavBarItems } from "../app.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const signOutHandler = async () => {
    dispatch(signOutStart());
  };

  return (
    <Fragment>
      <NavBar>
        <NavBarItems>
          {currentUser ? (
            <Fragment>
              <Link to="/current-todos">Current Todos</Link>
              <Link to="/completed-todos">Completed Todos</Link>
              <Link to="/all-todos">All Todos</Link>
              <AddTodoButton />
              <Link onClick={signOutHandler} to="/login">
                Logout
              </Link>
            </Fragment>
          ) : (
            <Link to="login">Login</Link>
          )}
        </NavBarItems>
      </NavBar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
