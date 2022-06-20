import { useState, Fragment } from "react";

import SubtaskItem from "./subtask-item.component";
import AddSubtaskButton from "./add-subtask-button.component";
import Button from "./button.component";
import {
  TodoItemCart,
  TodoTitle,
  TodoDescription,
  TodoTitleBlock,
} from "../app.styles";

const TodoItem = ({ todo }) => {
  const { id, title, description, priority, subtasks, completed_at } = todo;

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
        status={completed_at}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
      >
        <TodoTitle status={completed_at} to={`/todo/${id}/`}>
          {title}
        </TodoTitle>

        {hover && (
          <Fragment>
            <Button buttonType="small" onClick={handleExpanded}>
              Quick view
            </Button>
            <Button buttonType="small" onClick={handleOpenTodoItem}>
              Edit
            </Button>
            {subtasks.length > 0 && (
              <Button buttonType="small" onClick={handleViewSubtasks}>
                View subtasks
              </Button>
            )}
            <AddSubtaskButton buttonType="small" parent_id={todo.id} />
          </Fragment>
        )}
      </TodoTitleBlock>

      {isExpanded && <TodoDescription>{description}</TodoDescription>}

      {viewSubtasks && (
        <Fragment>
          {subtasks.map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask} />
          ))}
        </Fragment>
      )}
    </TodoItemCart>
  );
};

export default TodoItem;
