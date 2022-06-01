const TodoItem = ({todo}) => {
  const {title, description, priority} = todo;
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{priority}</div>
    </div>
  );
};

export default TodoItem;
