import axios from "axios";

const LOGIN_API_URL = "/api/accounts/login/";
const SIGN_UP_API_URL = "/api/accounts/signup/";
const USER_API_URL = "/api/accounts/user/";
const REFRESH_TOKEN_API_URL = "/api/accounts/refreshtoken/";

const headers = (accessToken) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getStorageUserId = () => localStorage.getItem("userId");

export const getStorageAccessToken = () => localStorage.getItem("accessToken");
export const getStorageRefreshToken = () =>
  localStorage.getItem("refreshToken");

export const refreshAccessToken = (refreshToken) =>
  localStorage.setItem("accessToken", refreshToken);

export const getUser = async (userId) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .get(USER_API_URL + userId + "/", headers(accessToken))
    .then((response) => {
      localStorage.setItem("userId", response.data.id);
      return response.data;
    });
};

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
        localStorage.setItem("userId", response.data.id);
      }
      return response.data;
    });
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
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

export const refreshTokenAPI = async (refresh) => {
  return axios
    .post(REFRESH_TOKEN_API_URL, {
      refresh,
    })
    .then((response) => {
      return response.data;
    });
};
