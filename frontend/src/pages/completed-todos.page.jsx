import Todos from "../components/todos.component";

const CompletedTodos = () => {
  return (
    <div>
      <Todos status="?status=completed" />
    </div>
  );
};

export default CompletedTodos;
