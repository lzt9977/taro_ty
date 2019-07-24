import {
  UPDATE_NET_WORK,
  GET_CLASSIFY
} from '../constants/common'


import api from '@utils/api'

import { createAction } from '@utils/createAction'

export const UpdateNetWorkStatus = status => {
  return (dispatch => {
    dispatch({
      type: UPDATE_NET_WORK,
      status
    })
  })
}


export const getClassify = payload => createAction({
  url: api.classify,
  type: GET_CLASSIFY,
  method: "POST",
  payload
})
