import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { completeTodoStart } from "../store/todos/todos.action";
import Button from "./button.component";

const CompleteTodo = ({ todoId, accessToken, isSubtask }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  let itemType = isSubtask ? "subtask" : "todo";

  const handleComplete = async (event) => {
    event.preventDefault();
    dispatch(completeTodoStart(todoId, accessToken, itemType));
    navigate("/current-todos");
  };

  return (
    <Button type="submit" onClick={handleComplete}>
      Complete
    </Button>
  );
};

export default CompleteTodo;
