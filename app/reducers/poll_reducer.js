import {
  FETCH_ALL_POLLS,
  FETCH_POLL,
  CLEAR_POLL
} from '../actions/types';

const INITIAL_STATE = {
  poll: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_POLLS:
      return { ...state, allPolls: action.payload };
    case FETCH_POLL:
      return { ...state, poll: action.payload };
    case CLEAR_POLL:
      return { ...state, poll: null };
    default:
      return state;
  }
};
