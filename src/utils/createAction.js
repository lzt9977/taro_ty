/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */
import Request from './request'

export function createAction(options) {
  const { url, method, payload, type } = options
  return (dispatch) => {
    return Request({ url, method, payload }).then((res) => {
      dispatch({ type, payload:res })
      return res
    })
  }
}
