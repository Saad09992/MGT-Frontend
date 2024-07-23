import backendValidUser from "../../api/backendVerifiedUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import { GET_USER_CART_ITEM } from "../Types/CartTypes";

export const addItemToCart = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendValidUser.post(`/add-item-to-cart`, data);
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      dispatch(getUserCartItem());

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};

export const getUserCartItem = () => {
  return async (dispatch, getState) => {
    const { AuthReducers } = getState();

    dispatch({ type: SET_LOADER });
    try {
      const response = await backendValidUser.get(
        `/get-user-cart-item/${AuthReducers.user.id}`
      );
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: GET_USER_CART_ITEM, payLoad: response.data });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};

export const removeUserCartItem = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendValidUser.get(
        `/remove-user-cart-item/${id}`
      );
      dispatch({ type: CLOSE_LOADER });

      dispatch(getUserCartItem());

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};

export const increaseUserCartItemQty = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendValidUser.get(
        `/increase-user-cart-item-qty/${id}`
      );
      dispatch({ type: CLOSE_LOADER });

      dispatch(getUserCartItem());

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};

export const decreaseUserCartItemQty = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendValidUser.get(
        `/decrease-user-cart-item-qty/${id}`
      );
      dispatch({ type: CLOSE_LOADER });

      dispatch(getUserCartItem());

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};
