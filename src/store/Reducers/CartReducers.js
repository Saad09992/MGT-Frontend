import { GET_USER_CART_ITEM, REMOVE_USER_CART_ITEM } from "../Types/CartTypes";

const initialState = {
  cartItem: [],
};

const CartReducers = (state = initialState, action) => {
  if (action.type === GET_USER_CART_ITEM) {
    return { ...state, cartItem: action.payLoad };
  } else if (action.type === REMOVE_USER_CART_ITEM) {
    return { ...state, cartItem: [] };
  } else {
    return state;
  }
};

export default CartReducers;
