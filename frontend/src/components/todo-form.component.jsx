import { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchTodoStart, editTodoStart } from "../store/todos/todos.action";
import { selectTodo, selectTodoIsLoading } from "../store/todos/todos.selector";
import DeleteTodoItem from "./delete-todo-item.component";
import CompleteTodo from "./complete-todo.component";
import Option from "./option-drop-down.component";
import SelectBox from "./select-box.component";
import SelectParent from "./select-parent.component";
import Button from "./button.component";
import AddSubtaskButton from "./add-subtask-button.component";
import Spinner from "./spinner.component";
import {
  AddTodoContainer,
  TodoItemForm,
  Input,
  InputDescription,
  Title,
  Subtitle,
} from "../app.styles";

const defaultFormFields = {
  title: "",
  description: "",
  priority: 2,
  parent_id: "",
  completed_at: null,
};

const TodoForm = ({ isSubtask }) => {
  const params = useParams();
  const navigate = useNavigate();

  const todoId = params.id;
  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);

  const itemType = isSubtask ? "subtask" : "todo";

  const todo = useSelector(selectTodo);
  const isLoading = useSelector(selectTodoIsLoading);

  useEffect(() => {
    dispatch(fetchTodoStart(todoId, accessToken, itemType));
  }, [accessToken, dispatch, todoId, itemType]);

  useEffect(() => {
    setFormFields(todo);
  }, [todo]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (name === "priority" || name === "parent_id") {
      value = parseInt(value);
    }

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(editTodoStart(formFields, todoId, accessToken, itemType));
    resetFormFields();
    navigate("/current-todos");
  };

  const date = new Date(formFields?.completed_at);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Title>Edit {itemType}</Title>
          {formFields?.completed_at && (
            <Subtitle>Completed {completed_short_date}</Subtitle>
          )}
          <AddTodoContainer>
            <TodoItemForm onSubmit={handleSubmit}>
              <Input
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
                />
              )}

              <Button type="submit">Save changes</Button>
              {!formFields?.completed_at && (
                <CompleteTodo
                  todoId={todoId}
                  accessToken={accessToken}
                  isSubtask={isSubtask}
                />
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
      )}
    </Fragment>
  );
};

export default TodoForm;
