import {
  SET_ROLES,
  SET_SPECIFIC_ROLE,
  SET_ERROR,
  SET_SUCCESS,
} from "../Types/RoleTypes";

const initialState = {
  roles: [], // Ensure this is an empty array
  specificRole: null,
  loading: false,
  error: null,
  success: null,
};

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case SET_SPECIFIC_ROLE:
      return {
        ...state,
        specificRole: action.payload,
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

export default RoleReducer;
