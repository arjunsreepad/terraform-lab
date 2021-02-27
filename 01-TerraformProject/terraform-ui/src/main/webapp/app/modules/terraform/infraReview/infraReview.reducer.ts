import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { getSession } from 'app/shared/reducers/authentication';
import infraRequest from '../infraRequest/infraRequest';

export const ACTION_TYPES = {
  LAUNCH_REQ: 'infraRequest/LAUNCH_REQ',
  VALIDATE_REQ: 'infraRequest/VALIDATE_REQ',
  APPLY_REQ: 'infraRequest/APPLY_REQ',
  SCHEDULE_REQ: 'infraRequest/SCHEDULE_REQ',
  RESET: 'account/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updateFailure: false,
  reviewInfraReq : {}
};

export type ReviewInfraReqState = Readonly<typeof initialState>;

// Reducer
export default (state: ReviewInfraReqState = initialState, action): ReviewInfraReqState => {
  console.log('ReviewInfraReqState.reducers.ts -> state and action= ', { state, action });
  switch (action.type) {
    case REQUEST(ACTION_TYPES.APPLY_REQ):
    case REQUEST(ACTION_TYPES.LAUNCH_REQ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.APPLY_REQ):
    case FAILURE(ACTION_TYPES.LAUNCH_REQ):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.APPLY_REQ):
    case SUCCESS(ACTION_TYPES.LAUNCH_REQ):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false,
        reviewInfraReq: action.payload
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
const defaultURL = 'http://localhost:3000/api/reviewInfraReq';
const approveURL = 'http://localhost:3000/api/approveInfraReq';
const apiUrl = 'api/validaterequest';
const apiUrl3 = 'api/schedulerequest';

export const launchReviewRequest = input => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.LAUNCH_REQ,
    payload: axios.get(defaultURL, input),
    meta: {
      successMessage: '<strong>Load Successfull!</strong>'
    }
  });

  await dispatch(getSession());
};

export const approveInfraRequest = infraRequest => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.APPLY_REQ,
    payload: axios.post(approveURL, infraRequest),
    meta: {
      successMessage: '<strong>InfraRequest Approved!</strong>'
    }
  });

  await dispatch(getSession());
};

export const validateInfraRequest = infraRequest => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.LAUNCH_REQ,
    payload: axios.post(apiUrl, infraRequest),
    meta: {
      successMessage: '<strong>InfraRequest Validated!</strong>'
    }
  });

  await dispatch(getSession());
};

export const scheduleInfraRequest = infraRequest => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.LAUNCH_REQ,
    payload: axios.post(apiUrl, infraRequest),
    meta: {
      successMessage: '<strong>InfraRequest Scheduled!</strong>'
    }
  });

  await dispatch(getSession());
};



export const reset = () => ({
  type: ACTION_TYPES.RESET
});
