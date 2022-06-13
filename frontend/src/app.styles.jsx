import { Link } from "react-router-dom";

import styled from "styled-components";

const darkGreyColor = "#484848";
const hoverColor = "#fbc531";
const borderColor = "#dee2e6";

const lowPriorityColor = "#6c757d";
const mediumPriorityColor = "#4a8268";
const highPriorityColor = "#d44e5b";

const deleteColor = "#d11a2a";

export const NavBar = styled.nav`
  background-color: ${darkGreyColor};
  height: 60px;
  padding: 20px;
  font-size: 18px;
  letter-spacing: 0.5px;
  font-weight: bolder;
`;

export const NavBarItems = styled.nav`
  margin-left: 20px;

  & > a {
    padding-right: 20px;

    &:hover {
      color: ${hoverColor};
    }
  }

  > * {
    &:last-child {
      right: 40px;
      position: absolute;
    }
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

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

  > * {
    margin-bottom: 20px;
  }
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

export const BaseButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: ${darkGreyColor};
  line-height: 40px;
  padding: 0 15px;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: white;
  font-weight: bolder;
  border: none;
  min-width: 140px;

  &:hover {
    color: ${hoverColor};
  }
`;

export const DeleteButton = styled(BaseButton)`
  background-color: ${deleteColor};
`;

export const AddTodoButton = styled(BaseButton)`
  font-size: 18px;
  display: inline;
  line-height: 20px;
`;
