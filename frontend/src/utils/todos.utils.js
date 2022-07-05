import axiosConfig from "./axiosConfig"

const API_URL = "/api/todos/";
const API_COMPLETE_URL = "/api/todos/complete/";
const API_SUBTASKS_URL = "/api/todos/subtasks/";

export const getTodos = (status = "", offset = 0) => {
  if (status) {
    status = `&status=${status}`;
  }
  return (
    axiosConfig
      .get(
        API_URL + `?limit=10&offset=${offset}` + status
      )
      .then((response) => {
        return response.data;
      })
  );
};

export const getTodo = async (todoId) => {
  return axiosConfig
    .get(API_URL + todoId + "/")
    .then((response) => {
      return response.data;
    })
};

export const addTodo = async (todo) => {
  const { title, description, priority } = todo;
  return axiosConfig
    .post(
      API_URL,
      {
        title,
        description,
        priority,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const editTodo = async (todo, todoId) => {
  const { title, description, priority } = todo;
  return axiosConfig
    .put(
      API_URL + todoId + "/",
      {
        title,
        description,
        priority,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const deleteTodo = async (todoId) => {
  return axiosConfig
    .delete(API_URL + todoId + "/")
    .then((response) => {
      return response.data;
    });
};

export const completeTodo = async (todoId) => {
  return axiosConfig
    .patch(API_COMPLETE_URL + todoId + "/", {})
    .then((response) => {
      return response.data;
    });
};

export const getSubtask = async (subtaskId) => {
  return axiosConfig
    .get(API_SUBTASKS_URL + subtaskId + "/")
    .then((response) => {
      return response.data;
    })
};

export const deleteSubtask = async (subtaskId) => {
  return axiosConfig
    .delete(API_SUBTASKS_URL + subtaskId + "/")
    .then((response) => {
      return response.data;
    });
};

export const editSubtask = async (subtask, subtaskId) => {
  const { title, description, priority, parent_id } = subtask;
  return axiosConfig
    .patch(
      API_SUBTASKS_URL + subtaskId + "/",
      {
        title,
        description,
        priority,
        parent_id,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const addSubtask = async (subtask, parent_id) => {
  const { title, description, priority } = subtask;
  return axiosConfig
    .post(
      API_URL + parent_id + "/subtasks",
      {
        title,
        description,
        priority,
      }
    )
    .then((response) => {
      return response.data;
    });
};
