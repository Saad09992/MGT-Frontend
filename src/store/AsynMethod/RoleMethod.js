import axios from "axios";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import { SET_ROLES, SET_SPECIFIC_ROLE } from "../Types/RoleTypes";

export const fetchRoles = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await axios.get("/api/roles");
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_ROLES, payload: response.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_ERROR,
        payload: err.response?.data?.error?.msg,
      });
    }
  };
};

export const addRole = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await axios.post("/api/roles", data);
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

export const updateRole = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await axios.put(`/api/roles/${id}`, data);
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

export const deleteRole = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      await axios.delete(`/api/roles/${id}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payload: "Role deleted successfully" });
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
