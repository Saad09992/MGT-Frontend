import backend from "../../api/backend";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import { SET_USERS, SET_SPECIFIC_USERS } from "../Types/UserTypes";

export const addUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.post("/add-user", data); // Update the endpoint here
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payload: response.data.success.msg });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_ERROR,
        payload: err.response?.data?.error?.msg,
      });
      return false;
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.get("/users");
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_USERS, payload: response.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_ERROR,
        payload: err.response?.data?.error?.msg,
      });
    }
  };
};
