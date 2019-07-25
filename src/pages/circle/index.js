import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Video } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { NetWork, Loading, Common } from '@components'

import * as actions from '@actions/circle'
import './index.less'

@connect(
  state => {
    return {
      common: state.common,
      circle: state.circle
    }
  },
  { ...actions }
)
class Circle extends Component {

  state = {
    loading: true
  }

  config = {
    navigationBarTitleText: '电竞圈',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fd4344',
    navigationBarTextStyle: 'white',
  }

  componentWillUnmount () { }

  componentDidShow() {
    this.props.getInviteList().then(res => {
      if (res.code == 200) {
        this.setState({
          loading: false
        })
      }
    })
  }

  navigateTo(id) {
    Taro.navigateTo({
      url: "/pages/circle/detail/index?id="+id,
    })
  }

  componentDidHide () { }

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />
    }

    if (this.state.loading) {
      return <Loading />
    }

    return (
      <View className='circle'>
        <Common />
        <View>
          {
            this.props.circle.list.map((v, i) => {
              return (
                <View className='item' key={v.id}>
                  <View className='head'>
                    <Image src={ v.avatar } className='avatar' />
                    <View className='item-accompany'>
                      <Text className='name'>{ v.accompany_name }</Text>
                      <Text className='time'>{ v.create_time }</Text>
                    </View>
                  </View>
                  <View className='content' onClick={ this.navigateTo.bind(this, v.id) }>
                    { v.content }
                  </View>


                  {
                    v.video ? <View className='image-view'>
                      <View className='top'>
                        <View className='iconfont icon-huo'></View>TOP { i + 1 }
                      </View>
                      <Video className="myVideo" poster={ v.video_poster } src={ v.video } controls></Video>
                    </View>
                    :
                    <View className='image-view' onClick={ this.navigateTo.bind(this, v.id) }>
                      <View className='top'>
                        <View className='iconfont icon-huo'></View>TOP { i + 1 }
                      </View>
                      <Image src={ v.image } mode="aspectFill" className='image' />
                    </View>
                  }

                  {
                    v.comment.length > 0 && <View className='comment' onClick={ this.navigateTo.bind(this, v.id) }>
                      {
                        v.comment.map((item, idx)=>{
                          return (
                            <View className='qs' key={item.id}>
                              <Text>{ item.nickName }</Text>
                              <Text>:</Text>
                              <Text>{ item.content }</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  }

                  <View className='agree' onClick={ this.navigateTo.bind(this, v.id) }>
                    <View className='item-agree'>
                      <View className='iconfont icon-zan'></View>
                      <Text className='num'>{ v.agree_num }</Text>
                    </View>
                    <View className='item-agree'>
                      <View className='iconfont icon-liuyanguanli'></View>
                      <Text className='num'>{ v.view_num }</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default Circle
