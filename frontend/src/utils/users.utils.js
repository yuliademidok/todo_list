import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/accounts/login/";

export const login = async (username, password) => {
  return axios
    .post(API_URL, {
      username,
      password,
    })
    .then((response) => {
      if (!username || !password) {
        return;
      }

      if (response.data.access) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.access)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refresh)
        );
      }
      return response.data;
    });
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
