import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { addTodo } from "../utils/todos.utils";
import Option from "./option-drop-down.component";
import SelectBox from "./select-box.component";
import Button from "./button.component";
import {
  AddTodoContainer,
  TodoItemForm,
  InputTitle,
  InputDescription,
  Title
} from "../app.styles";

const defaultFormFields = {
  title: "",
  description: "",
  priority: 2,
};

const AddTodoItem = () => {
  const [formFields, setFromFields] = useState(defaultFormFields);
  const { title, description, priority } = formFields;

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

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
      await addTodo(formFields, accessToken);
      resetFormFields();
      navigate("/current-todos");
    } catch (error) {
      console.log("Error occured when adding todo:", error);
    }
  };

  return (
    <Fragment>
      <Title>Add todo</Title>
      <AddTodoContainer>
        <TodoItemForm onSubmit={handleSubmit}>
          <InputTitle
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

          <Button type="submit">Add todo</Button>
        </TodoItemForm>
      </AddTodoContainer>
    </Fragment>
  );
};

export default AddTodoItem;
