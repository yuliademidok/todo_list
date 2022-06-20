import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { deleteTodo, deleteSubtask } from "../utils/todos.utils";
import Button from "./button.component";

const DeleteTodoItem = ({ todoId, accessToken, isSubtask }) => {
  const navigate = useNavigate();

  let itemType = isSubtask ? "subtask" : "todo";

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      if (isSubtask) {
        await deleteSubtask(todoId, accessToken);
      } else {
        await deleteTodo(todoId, accessToken);
      }
      toast.success(`${itemType} is deleted`);
      navigate("/current-todos");
    } catch (error) {
      toast.error(`Error occured when deleting ${itemType}`);
    }
  };

  return (
    <Button buttonType="delete" type="button" onClick={handleDelete}>
      Delete {itemType}
    </Button>
  );
};

export default DeleteTodoItem;
