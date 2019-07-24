import {
  INVITE_POST,
  ACCOMPANY_REGISTER
} from '../constants/user'

const INITIAL_STATE = {

};

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVITE_POST: {
      return {
        ...state
      }
    }
    case ACCOMPANY_REGISTER: {
      return {
        ...state
      }
    }
    default:
      return state;
  }
}
