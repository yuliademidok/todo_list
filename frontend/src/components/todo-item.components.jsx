import { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { getTodo, editTodo } from "../utils/todos.utils";
import DeleteTodoItem from "./delete-todo-item.component";
import Option from "./option-drop-down.component";
import SelectBox from "./select-box.component";
import {
  AddTodoContainer,
  TodoItemForm,
  InputTitle,
  InputDescription,
} from "../app.styles";

const defaultFormFields = {
  title: "",
  description: "",
  priority: 2,
};

const TodoItem = () => {
  const params = useParams();
  const navigate = useNavigate();

  const todoId = params.id;
  const accessToken = localStorage.getItem("accessToken");

  const [formFields, setFromFields] = useState(defaultFormFields);

  useEffect(() => {
    const fetchTodos = (data) => {
      setFromFields(data);
    };
    getTodo(accessToken, todoId, fetchTodos);
  }, []);

  const resetFormFields = () => {
    setFromFields(defaultFormFields);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (name === "priority") {
      value = parseInt(value);
    }

    setFromFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await editTodo(formFields, todoId, accessToken);
      resetFormFields();
      navigate("/current-todos");
    } catch (error) {
      console.log("Error occured when adding todo:", error);
    }
  };

  return (
    <Fragment>
      <h1>Edit todo</h1>
      <AddTodoContainer>
        <TodoItemForm onSubmit={handleSubmit}>
          <InputTitle
            label="Title"
            required
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Todo title"
            value={formFields?.title}
          />
          <InputDescription
            label="Description"
            required
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="Todo Description"
            value={formFields?.description}
          />

          <SelectBox
            onChange={handleChange}
            value={formFields?.priority}
            label="Priority"
            name="priority"
          >
            <Option value="3" description="Low" />
            <Option value="2" description="Medium" />
            <Option value="1" description="Hight" />
          </SelectBox>

          <button type="submit">Save changes</button>
          <DeleteTodoItem todoId={todoId} />
        </TodoItemForm>
      </AddTodoContainer>
    </Fragment>
  );
};

export default TodoItem;
