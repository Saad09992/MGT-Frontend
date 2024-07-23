import {
  SET_USERS,
  SET_SPECIFIC_USERS,
  RESET_SPECIFIC_USERS,
  SET_ERROR,
  SET_SUCCESS,
} from "../Types/UserTypes";

const initialState = {
  allUsers: [],
  specificUser: null,
  loading: false,
  error: null,
  success: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case SET_SPECIFIC_USERS:
      return {
        ...state,
        specificUser: action.payload,
      };
    case RESET_SPECIFIC_USERS:
      return {
        ...state,
        specificUser: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
