import { postDataAPI } from "../../utils/fetchData";


export const USER_TYPES = {
    AUTH:'AUTH',
    ALERT:'ALERT',
    ERROR:'ERROR'
}

export const registerUser = (data) => async (dispatch) => {
  try {
    const val = await postDataAPI("/register", data);
    if(!val.data.status) return

    dispatch({
      type: USER_TYPES.AUTH,
      payload: {
        token: val.data.acces_tocken,
        user: val.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: USER_TYPES.ERROR,
      payload: {
        message: val.data.message,
      },
    });
  } catch (err) {
    dispatch({
      type: USER_TYPES.ERROR,
      payload: {
        error: err.message,
      },
    });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const val = await postDataAPI("/login", data);

    dispatch({
      type: USER_TYPES.AUTH,
      payload: {
        token: val.data.acces_tocken,
        user: val.data.user,
        error:val.data.message
      },
    });

    localStorage.setItem("firstLogin", true);

  } catch (err) {
    dispatch({
      type: USER_TYPES.ERROR,
      payload: {
        error: err.message,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    try {
      const res = await postDataAPI("/refresh_token");

      dispatch({
        type: USER_TYPES.AUTH,
        payload: {
          token: res.data.acces_tocken,
          user: res.data.user,
        },
      });
    } catch (err) {
      dispatch({
        type: USER_TYPES.ERROR,
        payload: {
          error: err.message,
        },
      });
    }
  }
};