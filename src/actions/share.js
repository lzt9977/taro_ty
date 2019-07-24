import {
  GET_QR_CODE,
} from '../constants/share'

import api from '@utils/api'

import { createAction } from '@utils/createAction'

export const getQrCode = payload => createAction({
  url: api.getQrcode,
  type: GET_QR_CODE,
  method: "POST",
  payload
})
