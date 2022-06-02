import { Link } from "react-router-dom";

import styled from "styled-components";

const borderColor = "#dee2e6";
const lowPriorityColor = "#6c757d";
const mediumPriorityColor = "#4a8268";
const highPriorityColor = "#d44e5b";

export const TodoItemsContainer = styled.div`
  width: 800px;
  border-radius: 0.375rem;
  border: solid ${borderColor};
  margin: 10px auto;
`;

export const AddTodoContainer = styled(TodoItemsContainer)``;

export const TodoItemForm = styled.form`
  width: 760px;
  border-radius: 0.375rem;
  border: solid ${borderColor};
  margin: 20px auto;
`;

export const TodoTitle = styled(Link)`
  display: block;
  width: 100%;
  height: 50px;
  border: ${borderColor};
  padding: 15px 10px;
  color: white;

  background-color: ${({ value }) =>
    (value === 1 && `${highPriorityColor}`) ||
    (value === 2 && `${mediumPriorityColor}`) ||
    (value === 3 && `${lowPriorityColor}`)};
`;

export const TodoDescription = styled.div`
  display: block;
  width: 100%;
  height: 80px;
  border: ${borderColor};
  padding: 15px 10px;
`;

export const InputTitle = styled.input`
  width: 100%;
  margin-bottom: 20px;
  height: 50px;
  padding: 10px;
  border: solid ${borderColor};
  border-radius: 0.375rem;
`;

export const InputDescription = styled.textarea`
  width: 100%;
  margin-bottom: 20px;
  height: 150px;
  padding: 10px;
  border: solid ${borderColor};
  border-radius: 0.375rem;
`;

export const Select = styled.select`
  display: block;
  width: 30%;
  margin-bottom: 20px;
  height: 40px;
  padding: 10px;
  border: solid ${borderColor};
  border-radius: 0.375rem;
`;
