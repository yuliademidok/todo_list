import axios from "axios";

const API_URL = "/api/todos/";
const CURRENT_TODOS_URL = "?current";

export const getCurrentTodos = (accessToken, callback) => {
  return axios
    .get(API_URL + CURRENT_TODOS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addTodo = async (todo, accessToken) => {
  const { title, description, priority } = todo;
  return axios
    .post(
      API_URL,
      {
        title,
        description,
        priority,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};
