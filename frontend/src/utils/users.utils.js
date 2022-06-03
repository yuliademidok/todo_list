import axios from "axios";

const LOGIN_API_URL = "/api/accounts/login/";
const SIGN_UP_API_URL = "/api/accounts/signup/";

export const login = async (username, password) => {
  return axios
    .post(LOGIN_API_URL, {
      username,
      password,
    })
    .then((response) => {
      if (!username || !password) {
        return;
      }

      if (response.data.access) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
      }
      return response.data;
    });
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const createUser = async (user) => {
  const { username, email, password } = user;
  return axios
    .post(SIGN_UP_API_URL, {
      username,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};
