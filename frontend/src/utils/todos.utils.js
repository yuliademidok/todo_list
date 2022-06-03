import axios from "axios";

const API_URL = "/api/todos/";

const headers = (accessToken) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getTodos = (accessToken, status, callback) => {
  return axios
    .get(API_URL + status, headers(accessToken))
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

export const getTodo = async (accessToken, todoId, callback) => {
  return axios
    .get(API_URL + todoId + "/", headers(accessToken))
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
      headers(accessToken)
    )
    .then((response) => {
      return response.data;
    });
};

export const editTodo = async (todo, todoId, accessToken) => {
  const { title, description, priority } = todo;
  return axios
    .put(
      API_URL + todoId + "/",
      {
        title,
        description,
        priority,
      },
      headers(accessToken)
    )
    .then((response) => {
      return response.data;
    });
};

export const deleteTodo = async (todoId, accessToken) => {
  return axios
    .delete(API_URL + todoId + "/", headers(accessToken))
    .then((response) => {
      return response.data;
    });
};
