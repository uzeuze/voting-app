import {
  FETCH_USER_POLLS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_POLLS:
      return { ...state, polls: action.payload };
    default:
      return state;
  }
};
