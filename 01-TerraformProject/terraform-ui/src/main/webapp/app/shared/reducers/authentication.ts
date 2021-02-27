import axios from 'axios';
import { Storage } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { fetch_accountdetails } from './authorized_account';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as string, // Errors returned from server side
  redirectMessage: null as string,
  sessionHasBeenFetched: false,
  idToken: null as string,
  logoutUrl: null as string
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  console.log('authentication.js state ', state);
  console.log('authentication.js action.type = ', action.type);
  console.log('authentication.js action = ', action);

  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION): {
      console.log('REQUEST action type ACTION_TYPES.GET_SESSION : ');
      return {
        ...state,
        loading: true
      };
    }
    case FAILURE(ACTION_TYPES.LOGIN): {
      console.log('FAILURE action type ACTION_TYPES.LOGIN : ');
      return {
        ...initialState,
        errorMessage: action.payload,
        showModalLogin: true,
        loginError: true
      };
    }
    case FAILURE(ACTION_TYPES.GET_SESSION): {
      console.log('FAILURE action type ACTION_TYPES.GET_SESSION : ');
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.payload
      };
    }
    case SUCCESS(ACTION_TYPES.LOGIN): {
      console.log('SUCCESS action type ACTION_TYPES.GET_SESSION : ');
      return {
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true
      };
    }
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        showModalLogin: true
      };
    case ACTION_TYPES.GET_SESSION :
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
      console.log('*** GOT IT ***** SUCCESS action type .ACTION_TYPES.GET_SESSIO : ', isAuthenticated);
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data
      };
    }
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        showModalLogin: true,
        redirectMessage: action.message
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const getSession = () => async (dispatch, getState) => {
  console.log('authentication.ts getSession ');
  dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: fetch_accountdetails('user')
    // payload: axios.get('api/account')
  });
};

export const login = (username, password, rememberMe = false) => async (dispatch, getState) => {
  console.log('authentication.ts login ', { username, password, rememberMe });
  const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: fetch_accountdetails(username)
    // payload: axios.post('api/authenticate', { username, password, rememberMe })
  });
  const bearerToken = result && result.value && result.value.headers ? result.value.headers.authorization : undefined;
  if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
    const jwt = bearerToken.slice(7, bearerToken.length);
    if (rememberMe) {
      Storage.local.set(AUTH_TOKEN_KEY, jwt);
    } else {
      Storage.session.set(AUTH_TOKEN_KEY, jwt);
    }
  }
  await dispatch(getSession());
};

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout = () => dispatch => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT,
    payload: {}
  });
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
  clearAuthToken();
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH
  });
};
