import { LOGIN_FAILURE, LOGIN_LOADING, LOGIN_SUCCESS } from "./action";

const initState = {
  loading: false,
  isAuthenticated: false,
  token: "",
  error: false,
  username: "",
};

export const loginReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_LOADING:
      return { ...store, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...store,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
        error: false,
        username: payload.username,
      };
    case LOGIN_FAILURE:
      return {
        ...store,
        loading: false,
        error: true,
        isAuthenticated: false,
        token: "",
        username: "",
      };
    default:
      return store;
  }
};
