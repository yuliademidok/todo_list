import { useNavigate } from "react-router-dom";

import { deleteTodo } from "../utils/todos.utils";
import Button from "./button.component";

const DeleteTodoItem = ({ todoId, accessToken }) => {
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await deleteTodo(todoId, accessToken);
      navigate("/current-todos");
    } catch (error) {
      console.log("Error occured when deleting todo:", error);
    }
  };

  return (
    <Button buttonType="delete" type="button" onClick={handleDelete}>
      Delete todo
    </Button>
  );
};

export default DeleteTodoItem;
