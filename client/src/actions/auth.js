import * as Action from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: Action.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: Action.AUTH_ERROR
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: Action.REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

  } catch (err) {
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: Action.REGISTER_FAIL
    });
  }
};

//Login User
export const login = ({ email, password }) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email, password });
    
    try {
      const res = await axios.post('/api/auth', body, config);
  
      dispatch({
        type: Action.LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      console.log(err.response.data.errors);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
      }
      dispatch({
        type: Action.LOGIN_FAIL
      });
    }
  };
  
  // Logout/Clear
  export const logout= () => dispatch => {
    dispatch({type:Action.LOGOUT});
    dispatch({type:Action.CLEAR_PROFILE});
    
  }
