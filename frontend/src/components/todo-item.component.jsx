import { TodoItemForm, TodoTitle, TodoDescription } from "../app.styles";

const TodoItem = ({ todo }) => {
  const { title, description, priority } = todo;
  return (
    <TodoItemForm>
      <TodoTitle to="/" value={priority}>{title}</TodoTitle>
      <TodoDescription>{description}</TodoDescription>
    </TodoItemForm>
  );
};

export default TodoItem;
