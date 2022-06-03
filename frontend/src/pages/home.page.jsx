import Todos from "../components/todos.component";

const Home = () => {
  return (
    <div>
      <Todos status="?status=current" />
    </div>
  );
};

export default Home;
