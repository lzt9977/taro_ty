import { GET_INVITE_LIST, GET_INVITE_DETAIL, GET_INVITE_COMMENT, POST_COMMENT } from '../constants/circle'
import { formatTime } from '@utils/utils'

const INITIAL_STATE = {
  list: [],
  invite: {},
  comment: []
}

export default function circle(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INVITE_LIST: {
      action.payload.data.map(v => {
        v.create_time = formatTime(new Date(v.create_time))
        v.image = v.images && v.images.length > 0 ? v.images.split(",")[0] : v.images
      })
      return {
        ...state,
        list: action.payload.data
      }
    }
    case GET_INVITE_DETAIL: {
      let data = action.payload.data
      data.image = data.images && data.images.length > 1 ? data.images.split(",")[0] : data.images
      data.create_time = formatTime(new Date(data.create_time))
      return {
        ...state,
        invite: data
      }
    }
    case GET_INVITE_COMMENT: {
      action.payload.data.list.map(v => {
        v.create_time = formatTime(new Date(v.create_time), 1)
      })
      return {
        ...state,
        comment: action.payload.data.list
      }
    }
    default:
      return state
  }
}
