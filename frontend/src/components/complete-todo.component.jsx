import { useNavigate } from "react-router";

import { completeTodo } from "../utils/todos.utils";
import Button from "./button.component";

const CompleteTodo = ({ todoId, accessToken }) => {
  const navigate = useNavigate();

  const handleComplete = async (event) => {
    event.preventDefault();
    try {
      await completeTodo(todoId, accessToken);
      navigate("/current-todos");
    } catch (error) {
      console.log("Error occured when completing todo:", error);
    }
  };

  return (
    <Button type="submit" onClick={handleComplete}>
      Complete todo
    </Button>
  );
};

export default CompleteTodo;
