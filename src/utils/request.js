import Taro from '@tarojs/taro';

export default ({ url, method = 'GET', payload = {} } = options) => {

  let form = payload
  let token = Taro.getStorageSync('token')

  return Taro.request({
    url: BASE_URL + BASE_VERSION + url,
    data: form,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      'Accept': 'application/json',
      'token': token,
    },
    method: method.toUpperCase(),
  }).then((res) => {
    if (res.data.code >= 500) {
      Taro.showToast({
        title: `${res.data.message}`,
        icon: 'none',
        mask: true,
      });
      return res.data
    } else {
      return res.data
    }
  })
}
