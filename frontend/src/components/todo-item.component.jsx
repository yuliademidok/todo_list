import { useState, Fragment } from "react";

import SubtaskItem from "./subtask-item.component";
import {
  TodoItemCart,
  TodoTitle,
  TodoDescription,
  TodoTitleBlock,
} from "../app.styles";

const TodoItem = ({ todo }) => {
  const { id, title, description, priority, subtasks } = todo;

  const [isExpanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
  const [viewSubtasks, setViewSubtasks] = useState(false);

  const handleExpanded = (event) => {
    event.preventDefault();
    setExpanded(!isExpanded);
  };

  const handleOpenTodoItem = (event) => {
    event.preventDefault();
    window.location.href = `/todo/${id}/`;
  };

  const handleViewSubtasks = (event) => {
    event.preventDefault();
    setViewSubtasks(!viewSubtasks);
  };

  return (
    <TodoItemCart>
      <TodoTitleBlock
        value={priority}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
      >
        <TodoTitle to={`/todo/${id}/`}>{title}</TodoTitle>

        {hover && (
          <Fragment>
            <button onClick={handleExpanded}>Quick view</button>
            <button onClick={handleOpenTodoItem}>Edit</button>
            {subtasks.length > 0 && (
              <button onClick={handleViewSubtasks}>View subtasks</button>
            )}
          </Fragment>
        )}
      </TodoTitleBlock>

      {isExpanded && <TodoDescription>{description}</TodoDescription>}

      {viewSubtasks && (
        <Fragment>
          {subtasks.map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask}/>
          ))}
        </Fragment>
      )}
    </TodoItemCart>
  );
};

export default TodoItem;
