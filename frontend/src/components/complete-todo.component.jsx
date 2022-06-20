import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { completeTodo } from "../utils/todos.utils";
import Button from "./button.component";

const CompleteTodo = ({ todoId, accessToken, isSubtask }) => {
  const navigate = useNavigate();

  let itemType = isSubtask ? "subtask" : "todo";

  const handleComplete = async (event) => {
    event.preventDefault();
    try {
      await completeTodo(todoId, accessToken);
      toast.success(`${itemType} is completed`);
      navigate("/current-todos");
    } catch (error) {
      toast.error(`Error occured when completing ${itemType}`);
    }
  };

  return (
    <Button type="submit" onClick={handleComplete}>
      Complete
    </Button>
  );
};

export default CompleteTodo;
