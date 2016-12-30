import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  AUTH_FORM_LOADING,
  UNAUTH_USER,
  CLEAR_AUTH_ERROR,
  AUTH_MODAL,
  HIDE_AUTH_MODAL
} from './types';

const API_URL = 'http://localhost:3000/api';

export function loginUser({ email, password }) {
  return function (dispatch) {
    dispatch({ type: AUTH_FORM_LOADING });

    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Incorrect password or email'));
      });
  };
}

export function signUpUser({ email, password }) {
  return function (dispatch) {
    dispatch({ type: AUTH_FORM_LOADING });

    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signOutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function clearAuthError() {
  return { type: CLEAR_AUTH_ERROR };
}

export function showAuthModal(modalName) {
  return { type: AUTH_MODAL, payload: modalName };
}

export function hideAuthModal() {
  return { type: HIDE_AUTH_MODAL };
}
