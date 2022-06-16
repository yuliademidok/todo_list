import { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import {
  getTodo,
  editTodo,
  getSubtask,
  editSubtask,
} from "../utils/todos.utils";
import DeleteTodoItem from "./delete-todo-item.component";
import CompleteTodo from "./complete-todo.component";
import Option from "./option-drop-down.component";
import SelectBox from "./select-box.component";
import SelectParent from "./select-parent.component";
import Button from "./button.component";
import AddSubtaskButton from "./add-subtask-button.component";
import {
  AddTodoContainer,
  TodoItemForm,
  InputTitle,
  InputDescription,
  Title,
  Subtitle,
} from "../app.styles";

const defaultFormFields = {
  title: "",
  description: "",
  priority: 2,
  parent_id: "",
};

const TodoForm = ({ isSubtask }) => {
  const params = useParams();
  const navigate = useNavigate();

  const todoId = params.id;
  const accessToken = localStorage.getItem("accessToken");

  const [formFields, setFromFields] = useState(defaultFormFields);

  useEffect(() => {
    const fetchTodos = (data) => {
      setFromFields(data);
    };
    if (isSubtask) {
      getSubtask(accessToken, todoId, fetchTodos);
    } else getTodo(accessToken, todoId, fetchTodos);
  }, []);

  const resetFormFields = () => {
    setFromFields(defaultFormFields);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (name === "priority" || name === "parent_id") {
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
      if (isSubtask) {
        await editSubtask(formFields, todoId, accessToken);
      } else await editTodo(formFields, todoId, accessToken);
      resetFormFields();
      navigate("/current-todos");
    } catch (error) {
      console.log("Error occured when adding todo:", error);
    }
  };

  const date = new Date(formFields.completed_at);
  const completed_short_date =
    date.getHours() +
    ":" +
    date.getMinutes() +
    " " +
    date.getDate() +
    "." +
    (date.getMonth() + 1) +
    "." +
    date.getFullYear();

  return (
    <Fragment>
      <Title>{isSubtask ? "Edit subtask" : "Edit todo"}</Title>
      {formFields.completed_at && (
        <Subtitle>Completed {completed_short_date}</Subtitle>
      )}
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

          {isSubtask && (
            <SelectParent
              parent_id={formFields?.parent_id}
              handleChange={handleChange}
              accessToken={accessToken}
            />
          )}

          <Button type="submit">Save changes</Button>
          {!formFields.completed_at && (
            <CompleteTodo todoId={todoId} accessToken={accessToken} />
          )}
          <DeleteTodoItem
            todoId={todoId}
            accessToken={accessToken}
            isSubtask={isSubtask}
          />

          {!isSubtask && <AddSubtaskButton parent_id={todoId} />}
        </TodoItemForm>
      </AddTodoContainer>
    </Fragment>
  );
};

export default TodoForm;
