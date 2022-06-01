import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../context/user.context";
import { logout } from "../utils/users.utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    await logout();
    setCurrentUser(null);
  }

  const addTodoHandler = () => {
    navigate('/new-todo');
  }

  return (
    <div>
      <Link to="/current-todos">Current Todos</Link>

      {currentUser ? (
        <Link onClick={signOutHandler} to="/">Logout</Link>
      ) : (
        <Link to="/">Login</Link>
      )}

      <button onClick={addTodoHandler}>Add todo</button>

      <Outlet />
    </div>
  );
};

export default Navigation;
