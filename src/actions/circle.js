import {
  GET_INVITE_LIST,
  GET_INVITE_DETAIL,
  GET_INVITE_COMMENT,
  POST_COMMENT
} from '../constants/circle'

import api from '@utils/api'

import { createAction } from '@utils/createAction'

export const getInviteList = payload => createAction({
  url: api.getInviteList,
  type: GET_INVITE_LIST,
  method: "POST",
  payload
})

export const getInviteDetail = payload => createAction({
  url: api.inviteDetail,
  type: GET_INVITE_DETAIL,
  method: "POST",
  payload
})

export const getInviteComment = payload => createAction({
  url: api.inviteComment,
  type: GET_INVITE_COMMENT,
  method: "POST",
  payload
})

export const postComment = payload => createAction({
  url: api.commentPost,
  type: POST_COMMENT,
  method: "POST",
  payload
})
