import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import loading from '@assets/images/loading.png'
import './index.less'

class Loading extends Component {

  render () {
    return (
      <View className='loading'><Image src={ loading } className='loading-img'></Image></View>
    )
  }
}
export default Loading
