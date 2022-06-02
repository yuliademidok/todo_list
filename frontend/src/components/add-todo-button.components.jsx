import { useNavigate } from "react-router-dom";

const AddTodoButton = () => {
  const navigate = useNavigate();

  const addTodoHandler = () => {
    navigate("/new-todo");
  };

  return <button onClick={addTodoHandler}>Add todo</button>;
};

export default AddTodoButton;
