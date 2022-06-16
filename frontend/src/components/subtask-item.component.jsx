import { useState, Fragment } from "react";

import Button from "./button.component";
import { SubtaskItemCart, TodoTitle } from "../app.styles";

const SubtaskForm = ({ subtask }) => {
  const { id, title, priority, completed_at } = subtask;

  const [hover, setHover] = useState(false);

  const handleOpenSubtaskItem = (event) => {
    event.preventDefault();
    window.location.href = `/subtask/${id}/`;
  };

  return (
    <SubtaskItemCart
      value={priority}
      status={completed_at}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      <TodoTitle status={completed_at} to={`/subtask/${id}/`}>
        {title}
      </TodoTitle>

      {hover && (
        <Fragment>
          <Button buttonType="small" onClick={handleOpenSubtaskItem}>
            Edit
          </Button>
        </Fragment>
      )}
    </SubtaskItemCart>
  );
};

export default SubtaskForm;
