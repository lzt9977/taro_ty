import { LOGIN, GET_MA_OPEN_ID } from '../constants/login'

const INITIAL_STATE = {
  userInfo: {}
}

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: action.payload.data
      }
    case GET_MA_OPEN_ID: {
        return {
          ...state,
          userInfo: action.payload.data
        };
      }
    default:
       return state
  }
}
