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
        <View class='share' onClick={ this.share }>
          <View class='iconfont icon-fenxiang'></View>
          <Text>分享</Text>
        </View>
        <View class='swiper-view'>
          <Swiper circular="true" interval={this.state.interval} onChange={this.swiperChange.bind(this)}>
            {
              this.props.home.swiper.map(v => {
                return (
                  <SwiperItem class='swiper-item' key={v.id}>
                    <Image src={ v.url } class="slide-image" />
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          <View class='indicator'>
            {
              this.props.home.swiper.map((v, index) => {
                return (
                  <View key={ v.id } class={ [index == this.state.idx ? 'active':'', 'dots'] }>
                    <View class='radius'></View>
                  </View>
                )
              })
            }
          </View>
        </View>

        <View class='hotClassify'>
          <View class='hot-class'>
            <Text>热门分类</Text>
            <View class='iconfont icon-fenlei' onClick={ this.navigator }></View>
          </View>
          <View class='pad-box'>
            <ScrollView class="scroll-view_H" scrollX={true}>
              {
                this.props.home.classify.map((v, i) => {
                  return (
                    <View key={ v.id } class='item-classify' onClick={ this.navigatorToList.bind(this, v.name, v.id) }>
                      <Image src={ v.icon } class='classify-icon'></Image>
                      <Text>{ v.name }</Text>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>

        <View class='hot-class'>
          <Text>热门推荐</Text>
        </View>
        <View class='item-view'>
          {
            this.props.home.accompany.map(v => {
              return (
                <View class='item-accompany' key={ v.id }>
                  <Image src={ v.avatar } class='avatar'></Image>
                  <View class='introduce'>
                    <View class='user_info'>
                      <Text class='name'>{ v.name }</Text>
                      <Text class='level'>{ v.level_name }</Text>
                    </View>
                    <View class='second'>
                      <Text>{ v.classify_name }</Text>
                      <Text class='pdlr'>|</Text>
                      <Text>接单量 { v.order_num }</Text>
                    </View>
                  </View>
                  <Text class='price'>{ v.price }RMB</Text>
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
