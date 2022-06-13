import { useNavigate } from "react-router-dom";

import Button from "./button.component";

const AddTodoButton = () => {
  const navigate = useNavigate();

  const addTodoHandler = () => {
    navigate("/new-todo");
  };

  return <Button buttonType="addTodo" onClick={addTodoHandler}>Add todo</Button>;
};

export default AddTodoButton;
