import { createContext, useState } from "react";

export const TodosContext = createContext({
  currentTodos: [],
  setCurrentTodos: () => {},
  currentTodosCount: 0,
  setCurrentTodosCount: () => {},
});

export const TodosProvider = ({ children }) => {
  const [currentTodos, setCurrentTodos] = useState([]);
  const [currentTodosCount, setCurrentTodosCount] = useState([]);
  const value = {
    currentTodos,
    setCurrentTodos,
    currentTodosCount,
    setCurrentTodosCount,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
