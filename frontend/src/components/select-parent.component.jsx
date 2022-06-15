import { useEffect, useContext } from "react";

import { getTodos } from "../utils/todos.utils";
import { TodosContext } from "../context/todos.context";
import Option from "./option-drop-down.component";
import SelectBox from "./select-box.component";

const SelectParent = ({ parent_id, handleChange, accessToken }) => {
  const { currentTodos, setCurrentTodos } = useContext(TodosContext);

  useEffect(() => {
    const fetchTodos = (data) => {
      const { results } = data;
      setCurrentTodos(results);
    };
    getTodos(accessToken, "", fetchTodos);
  }, []);

  return (
    <SelectBox
      onChange={handleChange}
      value={parent_id}
      label="Parent"
      name="parent_id"
    >
      {currentTodos.map((todo) => (
        <Option key={todo.id} value={todo.id} description={todo.title} />
      ))}
    </SelectBox>
  );
};

export default SelectParent;
