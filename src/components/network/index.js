import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import defaultAvatar from '@assets/images/network.png'
import './index.less'

class NetWork extends Component {

  showToast() {
    Taro.showToast({
      title: '网络状态不好 ,请稍等再试',
      icon: "none"
    })
  }

  render () {
    return (
      <View className="network" onClick={ this.showToast }>
        <View className='netbox'><Image src={ defaultAvatar } className='networkImg' /></View>
        <Text className='p1'>网络连接超时</Text>
        <Text className='p2'>请检查您的手机是否联网</Text>
        <Text className='p3'>点击屏幕重新加载</Text>
      </View>
    )
  }
}
export default NetWork
