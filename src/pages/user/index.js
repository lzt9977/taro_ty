import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { NetWork, Common } from '@components'
import './index.less'

import * as actions from '../../actions/circle'


@connect(
  state => {
    return {
      common: state.common
    }
  },
  { ...actions }
)
class User extends Component {

  state = {
    userInfo: {}
  }
  config = {
    navigationBarTitleText: '我的',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fd4344',
    navigationBarTextStyle: 'white',
  }


  componentWillUnmount () { }

  componentDidShow() {
    let userinfo = Taro.getStorageSync("user")
    this.setState({
      userInfo: userinfo
    })
  }
  navigation(router) {
    Taro.navigateTo({
      url: `/pages/user/${router}/index`,
    })
  }
  componentDidHide () { }

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />
    }
    let { userInfo } = this.state
    return (
      <View className='user'>
        <Common />
        <View>
          <View className='user-head'>
            <View className='avatar-flex'>
              <Image src={userInfo.avatarUrl} className='avatar'></Image>
              <View className='user-text'>
                <Text className='nickName text'>{ userInfo.nickName }</Text>
                <Text className='regtime text'>用户ID: { userInfo.reg_time }</Text>
              </View>
            </View>
            <View className='tag'>我的二维码</View>
            <View className='bean'>
              <Image src='http://118.24.33.215/images/guo.png' className='guo'></Image>我的豆子: { userInfo.bean }
              <Text className='tips'>现金比例1:100</Text>
              <Text className='beanList'>豆子明细</Text>
            </View>
          </View>
          <View className='order'>
            <View className='order-tit'>
              <Text className='tit'>我的订单</Text>
              <View className='see'>查看全部订单
                <View className='iconfont icon-arrow-right-copy-copy'></View>
              </View>
            </View>
            <View className='order-item'>
              <View className='item-li'>
                <View className='iconfont icon-daifukuan'></View>
                <Text>待付款</Text>
              </View>
              <View className='item-li'>
                <View className='iconfont icon-huowudui'></View>
                <Text>待配送</Text>
              </View>
              <View className='item-li'>
                <View className='iconfont icon-yiwancheng'></View>
                <Text>已提货</Text>
              </View>
              <View className='item-li'>
                <View className='iconfont icon-shouhoutuikuan'></View>
                <Text>售后退款</Text>
              </View>
            </View>
          </View>

          <View className='list'>
            <View className='list-li' onClick={this.navigation.bind(this, "post")}>
              <View className='iconfont icon-youhuiquan'></View>
              <Text className='mname'>发布动态</Text>
              <View className='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View className='list-li' onClick={this.navigation.bind(this, "accompany")}>
              <View className='iconfont icon-huangguan'></View>
              <Text className='mname'>成为陪主</Text>
              <View className='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View className='list-li'>
              <View className='iconfont icon-falv'></View>
              <Text className='mname'>法律申明</Text>
              <View className='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View className='list-li'>
              <View className='iconfont icon-tubiao-'></View>
              <Text className='mname'>联系客服</Text>
              <View className='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View className='list-li'>
              <View className='iconfont icon-kefu'></View>
              <Text className='mname'>常见问题</Text>
              <View className='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View className='list-li'>
              <View className='iconfont icon-wenjian'></View>
              <Text className='mname'>资质规则</Text>
              <View className='iconfont icon-arrow-right-copy-copy'></View>
            </View>
          </View>
          <Text className='bate'>电竞玩家版本号: 2.4.1</Text>
        </View>
      </View>
    )
  }
}

export default User
