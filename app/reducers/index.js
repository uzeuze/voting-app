import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import poll from './poll_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
  form,
  auth,
  poll,
  user
});

export default rootReducer;
