import { GET_ACCOMPANY_CLASSIFY } from '../constants/list'

const INITIAL_STATE = {
  listAccompany: []
}

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ACCOMPANY_CLASSIFY:
      return {
        ...state,
        listAccompany: action.payload.data
      }
    default:
       return state
  }
}
