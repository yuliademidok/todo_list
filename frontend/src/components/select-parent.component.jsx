import { useSelector } from "react-redux";

import Option from "./option-drop-down.component";
import SelectBox from "./select-box.component";
import { selectTodosItems } from "../store/todos/todos.selector";

const SelectParent = ({ parent_id, handleChange }) => {
  const todosItems = useSelector(selectTodosItems);

  return (
    <SelectBox
      onChange={handleChange}
      value={parent_id}
      label="Parent"
      name="parent_id"
    >
      {todosItems.map((todo) => (
        <Option key={todo.id} value={todo.id} description={todo.title} />
      ))}
    </SelectBox>
  );
};

export default SelectParent;
