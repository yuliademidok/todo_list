import { TodoItemForm, TodoTitle, TodoDescription } from "../app.styles";

const TodoItem = ({ todo }) => {
  const { id, title, description, priority } = todo;
  return (
    <TodoItemForm>
      <TodoTitle to={`/todo/${id}/`} value={priority}>{title}</TodoTitle>
      <TodoDescription>{description}</TodoDescription>
    </TodoItemForm>
  );
};

export default TodoItem;
