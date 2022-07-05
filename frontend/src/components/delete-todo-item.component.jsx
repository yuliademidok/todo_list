import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteTodoStart } from "../store/todos/todos.action";
import Button from "./button.component";

const DeleteTodoItem = ({ todoId, isSubtask }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  let itemType = isSubtask ? "subtask" : "todo";

  const handleDelete = async (event) => {
    event.preventDefault();
    dispatch(deleteTodoStart(todoId, itemType));
    navigate("/current-todos");
  };

  return (
    <Button buttonType="delete" type="button" onClick={handleDelete}>
      Delete {itemType}
    </Button>
  );
};

export default DeleteTodoItem;
