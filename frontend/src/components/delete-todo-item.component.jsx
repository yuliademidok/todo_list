import { useNavigate } from "react-router-dom";

import { deleteTodo } from "../utils/todos.utils";

const DeleteTodoItem = ({ todoId }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await deleteTodo(todoId, accessToken);
      navigate("/current-todos");
    } catch (error) {
      console.log("Error occured when deleting todo:", error);
    }
  };

  return (
    <button type="button" onClick={handleSubmit}>
      Delete todo
    </button>
  );
};

export default DeleteTodoItem;
