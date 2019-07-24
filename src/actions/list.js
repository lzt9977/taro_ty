import {
  GET_ACCOMPANY_CLASSIFY,
} from '../constants/list'

import api from '@utils/api'

import { createAction } from '@utils/createAction'

export const getAccompanyClassify = payload => createAction({
  url: api.accompanyList,
  type: GET_ACCOMPANY_CLASSIFY,
  method: "POST",
  payload
})
