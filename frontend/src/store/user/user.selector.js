import { createSelector } from "reselect";

export const selectUserRecucer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserRecucer],
  (user) => user.currentUser
);

export const selectUserIsLoading = createSelector(
  [selectUserRecucer],
  (user) => user.isLoading
);