import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { getSession } from 'app/shared/reducers/authentication';

export const ACTION_TYPES = {
  CREATE_INFRA_REQUEST: 'infrareq/CREATE_INFRA_REQUEST',
  RESET: 'infrareq/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updateFailure: false
};

export type CreateInfraReqState = Readonly<typeof initialState>;

// Reducer
export default (state: CreateInfraReqState = initialState, action): CreateInfraReqState => {
  console.log('CreateInfraReqState.reducers.ts -> state and action= ', { state, action });
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_INFRA_REQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.CREATE_INFRA_REQUEST):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.CREATE_INFRA_REQUEST):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
const apiUrl = 'http://localhost:3000/api/createInfraReq';

export const saveInfraRequest = infrareq => async dispatch => {
  console.log('infrareq = ', infrareq);
  await dispatch({
    type: ACTION_TYPES.CREATE_INFRA_REQUEST,
    payload: axios.post(apiUrl, infrareq),
    meta: {
      successMessage: '<strong>InfraRequest saved!</strong>'
    }
  });

  await dispatch(getSession());
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
