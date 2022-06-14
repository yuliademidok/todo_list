import { useState, Fragment } from "react";

import { SubtaskItemCart, TodoTitle, TodoDescription } from "../app.styles";

const SubtaskForm = ({ subtask }) => {
  const { id, title, priority, description } = subtask;

  const [hover, setHover] = useState(false);

  const handleOpenSubtaskItem = (event) => {
    event.preventDefault();
    window.location.href = `/subtask/${id}/`;
  };

  return (
    <SubtaskItemCart
      value={priority}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      <TodoTitle to={`/subtask/${id}/`}>{title}</TodoTitle>

      {hover && (
        <Fragment>
          <button onClick={handleOpenSubtaskItem}>Edit</button>
        </Fragment>
      )}
    </SubtaskItemCart>
  );
};

export default SubtaskForm;
