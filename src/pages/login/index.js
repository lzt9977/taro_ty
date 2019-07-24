import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '../../actions/loginAction'
import { NetWork } from '@components'

import './index.less'


@connect(
  state => {
    return {
      common: state.common,
    }
  },
  { ...actions }
)
class Login extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  componentWillUnmount () { }

  componentDidShow() {

  }

  componentDidHide() { }

  getUserInfo() {
    this.register()
  }

  register() {
    Taro.login({
      success: res => {
        const code = res.code
        Taro.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              Taro.getUserInfo({
                success: res => {
                  this.props.login({
                    encryptedData: res.encryptedData,
                    code: code,
                    iv: res.iv
                  }).then(res => {
                    if (res.code == 200) {
                      Taro.setStorageSync("token", res.token)
                      Taro.setStorageSync("user", res.data)

                      Taro.reLaunch({
                        url: "/pages/index/index"
                      })
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />
    }

    return (
      <View className='login'>
        <Button id='login-btn' openType="getUserInfo" lang="zh_CN" onGetUserInfo={ this.getUserInfo } >微信用户快速登录</Button>
      </View>
    )
  }
}

export default Login
