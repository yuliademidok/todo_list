import axios from "axios";

const API_URL = "/api/accounts/login/";

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
          'accessToken',
          response.data.access
        );
        localStorage.setItem(
          "refreshToken",
          response.data.refresh
        );
      }
      return response.data;
    });
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
