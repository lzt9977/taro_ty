import {
  GET_SWIPER,
  GET_HOT_CLASSIFY,
  GET_ACCOMPANY_LIST
} from '../constants/home'

import api from '@utils/api'

import { createAction } from '@utils/createAction'

export const getHomeSwiper = payload => createAction({
  url: api.homeSwiper,
  type: GET_SWIPER,
  method: "POST",
  payload
})


export const getHotClassify = payload => createAction({
  url: api.hotClassify,
  type: GET_HOT_CLASSIFY,
  method: "POST",
  payload
})

export const getAccompanyList = payload => createAction({
  url: api.accompanyList,
  type: GET_ACCOMPANY_LIST,
  method: "POST",
  payload
})
