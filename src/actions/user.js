import {
  INVITE_POST,
  ACCOMPANY_REGISTER
} from '../constants/user'

import api from '@utils/api'

import { createAction } from '@utils/createAction'

export const invitePost = payload => createAction({
  url: api.invitePost,
  type: INVITE_POST,
  method: "POST",
  payload
})

export const accompanyRegister = payload => createAction({
  url: api.accompanyRegister,
  type: ACCOMPANY_REGISTER,
  method: "POST",
  payload
})
