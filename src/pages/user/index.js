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
    console.log(userinfo)
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
          <View class='user-head'>
            <View class='avatar-flex'>
              <Image src={userInfo.avatarUrl} class='avatar'></Image>
              <View class='user-text'>
                <Text class='nickName text'>{ userInfo.nickName }</Text>
                <Text class='regtime text'>用户ID: { userInfo.reg_time }</Text>
              </View>
            </View>
            <View class='tag'>我的二维码</View>
            <View class='bean'>
              <Image src='http://118.24.33.215/images/guo.png' class='guo'></Image>我的豆子: { userInfo.bean }
              <Text class='tips'>现金比例1:100</Text>
              <Text class='beanList'>豆子明细</Text>
            </View>
          </View>
          <View class='order'>
            <View class='order-tit'>
              <Text class='tit'>我的订单</Text>
              <View class='see'>查看全部订单
                <View class='iconfont icon-arrow-right-copy-copy'></View>
              </View>
            </View>
            <View class='order-item'>
              <View class='item-li'>
                <View class='iconfont icon-daifukuan'></View>
                <Text>待付款</Text>
              </View>
              <View class='item-li'>
                <View class='iconfont icon-huowudui'></View>
                <Text>待配送</Text>
              </View>
              <View class='item-li'>
                <View class='iconfont icon-yiwancheng'></View>
                <Text>已提货</Text>
              </View>
              <View class='item-li'>
                <View class='iconfont icon-shouhoutuikuan'></View>
                <Text>售后退款</Text>
              </View>
            </View>
          </View>

          <View class='list'>
            <View class='list-li' onClick={this.navigation.bind(this, "post")}>
              <View class='iconfont icon-youhuiquan'></View>
              <Text class='mname'>发布动态</Text>
              <View class='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View class='list-li' onClick={this.navigation.bind(this, "accompany")}>
              <View class='iconfont icon-huangguan'></View>
              <Text class='mname'>成为陪主</Text>
              <View class='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View class='list-li'>
              <View class='iconfont icon-falv'></View>
              <Text class='mname'>法律申明</Text>
              <View class='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View class='list-li'>
              <View class='iconfont icon-tubiao-'></View>
              <Text class='mname'>联系客服</Text>
              <View class='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View class='list-li'>
              <View class='iconfont icon-kefu'></View>
              <Text class='mname'>常见问题</Text>
              <View class='iconfont icon-arrow-right-copy-copy'></View>
            </View>
            <View class='list-li'>
              <View class='iconfont icon-wenjian'></View>
              <Text class='mname'>资质规则</Text>
              <View class='iconfont icon-arrow-right-copy-copy'></View>
            </View>
          </View>
          <Text class='bate'>电竞玩家版本号: 2.4.1</Text>
        </View>
      </View>
    )
  }
}

export default User
