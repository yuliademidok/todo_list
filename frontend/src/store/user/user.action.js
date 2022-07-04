import { createAction } from "../../utils/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION_START);

export const signInStart = (username, password) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_START, { username, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export const refreshTokenStart = (refreshToken) =>
  createAction(USER_ACTION_TYPES.REFRESH_TOKEN_INIT, { refreshToken });

export const refreshTokenSuccess = () =>
  createAction(USER_ACTION_TYPES.REFRESH_TOKEN_SUCCESS);

export const refreshTokenFailed = (error) =>
  createAction(USER_ACTION_TYPES.REFRESH_TOKEN_FAILED, error);
