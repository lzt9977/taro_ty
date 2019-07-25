import Taro, { Component } from '@tarojs/taro'
import { View, Button, Swiper, SwiperItem, Image, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '../../actions/home'
import { NetWork, Loading, Common } from '@components'

import './index.less'


@connect(
  state => state,
  { ...actions }
)
class Index extends Component {

  // state只放本页静态数据 初始数据
  state = {
    loading: true,
    interval: 4000,
    idx: 0
  }

  config = {
    navigationBarTitleText: '首页',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fd4344',
    navigationBarTextStyle: 'white',
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() { }

  componentDidShow() {
    this.props.getHomeSwiper().then(res => {
      if (res.code == 200) {
        this.setState({
          loading: false
        })
      }
    })

    this.props.getHotClassify().then(res => {
      if (res.code == 200) {
        this.setState({
          loading: false
        })
      }
    })

    this.props.getAccompanyList().then(res => {
      if (res.code == 200) {
        this.setState({
          loading: false
        })
      }
    })
  }

  swiperChange(e) {
    let idx = e.detail.current
    this.setState({
      idx: idx
    })
  }

  navigatorToList(name, id) {
    Taro.navigateTo({
      url: '/pages/list/index?id=' + id + '&name=' + name,
    })
  }

  share() {
    Taro.navigateTo({
      url: '/pages/share/index',
    })
  }

  navigator() {
    Taro.navigateTo({
      url: '/pages/classify/index',
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
      <View className='index'>
        <Common />
        {
          process.env.TARO_ENV === 'weapp' && <View className='share' onClick={ this.share }>
            <View className='iconfont icon-fenxiang'></View>
            <Text>分享</Text>
          </View>
        }
        <View className="swiper-content">
          <View className='swiper-view'>
            <Swiper circular="true" interval={this.state.interval} onChange={this.swiperChange.bind(this)}>
              {
                this.props.home.swiper.map(v => {
                  return (
                    <SwiperItem className='swiper-item' key={v.id}>
                      <Image src={ v.url } className="slide-image" />
                    </SwiperItem>
                  )
                })
              }
            </Swiper>
            <View className='indicator'>
              {
                this.props.home.swiper.map((v, index) => {
                  return (
                    <View key={ v.id } className={ [index == this.state.idx ? 'active':'', 'dots'] }>
                      <View className='radius'></View>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>
        
        <View className='hotClassify'>
          <View className='hot-class'>
            <Text>热门分类</Text>
            <View className='iconfont icon-fenlei' onClick={ this.navigator }></View>
          </View>
          <View className='pad-box'>
            <ScrollView className="scroll-view_H" scrollX={true}>
              {
                this.props.home.classify.map((v, i) => {
                  return (
                    <View key={ v.id } className='item-classify' onClick={ this.navigatorToList.bind(this, v.name, v.id) }>
                      <Image src={ v.icon } className='classify-icon'></Image>
                      <Text>{ v.name }</Text>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>

        <View className='hot-class'>
          <Text>热门推荐</Text>
        </View>
        <View className='item-view'>
          {
            this.props.home.accompany.map(v => {
              return (
                <View className='item-accompany' key={ v.id }>
                  <Image src={ v.avatar } className='avatar'></Image>
                  <View className='introduce'>
                    <View className='user_info'>
                      <Text className='name'>{ v.name }</Text>
                      <Text className='level'>{ v.level_name }</Text>
                    </View>
                    <View className='second'>
                      <Text>{ v.classify_name }</Text>
                      <Text className='pdlr'>|</Text>
                      <Text>接单量 { v.order_num }</Text>
                    </View>
                  </View>
                  <Text className='price'>{ v.price }RMB</Text>
                </View>
              )
            })
          }
        </View>

      </View>
    )
  }
}

export default Index
