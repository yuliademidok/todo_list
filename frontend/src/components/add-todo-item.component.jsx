import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import { addTodoStart } from "../store/todos/todos.action";
import Option from "./option-drop-down.component";
import SelectBox from "./select-box.component";
import Button from "./button.component";
import {
  AddTodoContainer,
  TodoItemForm,
  Input,
  InputDescription,
  Title,
} from "../app.styles";

const defaultFormFields = {
  title: "",
  description: "",
  priority: 2,
};

const AddTodoItem = ({ isSubtask }) => {
  const [formFields, setFromFields] = useState(defaultFormFields);
  const { title, description, priority } = formFields;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const params = useParams();
  let parent_id = params.parent_id;

  let itemType = isSubtask ? "subtask" : "todo";

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
    dispatch(addTodoStart(formFields, itemType, parent_id));
    resetFormFields();
    navigate("/current-todos");
  };

  return (
    <Fragment>
      <Title>Add {itemType}</Title>
      <AddTodoContainer>
        <TodoItemForm onSubmit={handleSubmit}>
          <Input
            label="Title"
            required
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Todo title"
            value={title}
          />
          <InputDescription
            label="Description"
            required
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="Todo Description"
            value={description}
          />

          <SelectBox
            onChange={handleChange}
            value={priority}
            label="Priority"
            name="priority"
          >
            <Option value="3" description="Low" />
            <Option value="2" description="Medium" />
            <Option value="1" description="Hight" />
          </SelectBox>

          <Button type="submit">Add {itemType}</Button>
        </TodoItemForm>
      </AddTodoContainer>
    </Fragment>
  );
};

export default AddTodoItem;
