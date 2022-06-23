import { createAction } from "../../utils/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

/*
  SIGN_OUT_START: 'user/SIGN_OUT_START',
  SIGN_OUT_SUCCESS: 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILED: 'user/SIGN_OUT_FAILED',
};
  */

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

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
