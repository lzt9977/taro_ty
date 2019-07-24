import { GET_QR_CODE } from '../constants/share'

const INITIAL_STATE = {
  qrCode: ""
}

export default function share(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_QR_CODE:
      return {
        ...state,
        qrCode: action.payload.data
      }
    default:
       return state
  }
}
