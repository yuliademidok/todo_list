import { useNavigate } from "react-router-dom";

import { deleteTodo, deleteSubtask } from "../utils/todos.utils";
import Button from "./button.component";

const DeleteTodoItem = ({ todoId, accessToken, isSubtask }) => {
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      if (isSubtask) {
        await deleteSubtask(todoId, accessToken);
      } else {
        await deleteTodo(todoId, accessToken);
      }
      navigate("/current-todos");
    } catch (error) {
      console.log("Error occured when deleting todo:", error);
    }
  };

  return (
    <Button buttonType="delete" type="button" onClick={handleDelete}>
      {isSubtask ? "Delete subtask" : "Delete todo"}
    </Button>
  );
};

export default DeleteTodoItem;
