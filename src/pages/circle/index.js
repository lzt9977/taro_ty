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
                <View class='item' key={v.id}>
                  <View class='head'>
                    <Image src={ v.avatar } class='avatar' />
                    <View class='item-accompany'>
                      <Text class='name'>{ v.accompany_name }</Text>
                      <Text class='time'>{ v.create_time }</Text>
                    </View>
                  </View>
                  <View class='content' onClick={ this.navigateTo.bind(this, v.id) }>
                    { v.content }
                  </View>


                  {
                    v.video ? <View class='image-view'>
                      <View class='top'>
                        <View class='iconfont icon-huo'></View>TOP { i + 1 }
                      </View>
                      <Video class="myVideo" poster={ v.video_poster } src={ v.video } controls></Video>
                    </View>
                    :
                    <View class='image-view' onClick={ this.navigateTo.bind(this, v.id) }>
                      <View class='top'>
                        <View class='iconfont icon-huo'></View>TOP { i + 1 }
                      </View>
                      <Image src={ v.image } mode="aspectFill" class='image' />
                    </View>
                  }

                  {
                    v.comment.length > 0 && <View class='comment' onClick={ this.navigateTo.bind(this, v.id) }>
                      {
                        v.comment.map((item, idx)=>{
                          return (
                            <View class='qs' key={item.id}>
                              <Text>{ item.nickName }</Text>
                              <Text>:</Text>
                              <Text>{ item.content }</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  }

                  <View class='agree' onClick={ this.navigateTo.bind(this, v.id) }>
                    <View class='item-agree'>
                      <View class='iconfont icon-zan'></View>
                      <Text class='num'>{ v.agree_num }</Text>
                    </View>
                    <View class='item-agree'>
                      <View class='iconfont icon-liuyanguanli'></View>
                      <Text class='num'>{ v.view_num }</Text>
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
