//action types
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_LOADING = "REGISTER_LOADING";

//action creator

export const registerLoading = () => ({
  type: REGISTER_LOADING,
});

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerFailure = () => ({
  type: REGISTER_FAILURE,
});
