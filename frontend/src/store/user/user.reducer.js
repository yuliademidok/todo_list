import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: localStorage.getItem("userId"),
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      };
    case USER_ACTION_TYPES.SET_CURRENT_USER:
    case USER_ACTION_TYPES.CHECK_USER_SESSION_START:
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: localStorage.getItem("userId"),
        isLoading: false,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.REFRESH_TOKEN_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
