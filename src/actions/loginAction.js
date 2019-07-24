import {
  LOGIN,
  GET_MA_OPEN_ID
} from '../constants/login'

import api from '@utils/api'

import { createAction } from '@utils/createAction'

export const login = payload => createAction({
  url: api.login,
  type: LOGIN,
  method: "POST",
  payload
})


export const getMaOpenId = payload => createAction({
  url: api.isMaOpenId,
  type: GET_MA_OPEN_ID,
  method: "POST",
  payload
})
