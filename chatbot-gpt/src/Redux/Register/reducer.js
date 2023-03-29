import { REGISTER_FAILURE, REGISTER_LOADING, REGISTER_SUCCESS } from "./action";

const initState = {
  loading: true,
  isAuthenticated: false,
  token: "",
  error: false,
};

export const registerReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_LOADING:
      return { ...store, loading: true };
    case REGISTER_SUCCESS:
      return {
        ...store,
        loading: false,
        isAuthenticated: true,
        token: payload,
        error: false,
      };
    case REGISTER_FAILURE:
      return {
        ...store,
        loading: false,
        error: true,
      };
    default:
      return store;
  }
};
