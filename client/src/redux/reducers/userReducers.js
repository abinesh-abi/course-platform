import { USER_TYPES } from "../actions/userActions";

const intialSatate = {};

const autheReducer = (state = intialSatate, action) => {
  switch (action.type) {
    case USER_TYPES.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default autheReducer;
