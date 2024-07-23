import {
  RESET_CATEGORIES_WITH_SUB_CATEGORIES,
  RESET_PRODUCTS,
  RESET_SPECIFIC_PRODUCT,
  SET_CATEGORIES_WITH_SUB_CATEGORIES,
  SET_PRODUCTS,
  SET_SPECIFIC_PRODUCT,
} from "../Types/ProductTypes";

const initialState = {
  products: [],
  specificProduct: null,
  specificVarient: null,
  categoriesWithSub: [],
};

const ProductReducers = (state = initialState, action) => {
  if (action.type === SET_PRODUCTS) {
    return { ...state, products: action.payLoad };
  } else if (action.type === RESET_PRODUCTS) {
    return { ...state, products: [] };
  } else if (action.type === SET_SPECIFIC_PRODUCT) {
    return { ...state, specificProduct: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_PRODUCT) {
    return { ...state, specificProduct: null };
  } else if (action.type === SET_CATEGORIES_WITH_SUB_CATEGORIES) {
    return { ...state, categoriesWithSub: action.payLoad };
  } else if (action.type === RESET_CATEGORIES_WITH_SUB_CATEGORIES) {
    return { ...state, categoriesWithSub: [] };
  } else {
    return state;
  }
};

export default ProductReducers;
