import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Textarea, Picker, Swiper, Image, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { NetWork } from '@components'
import './index.less'

import * as actions from '../../actions/list'


@connect(
  state => {
    return {
      common: state.common,
      home: state.home,
      list: state.list
    }
  },
  { ...actions }
)
class List extends Component {

  state = {
    slider: [],
    accompany: [],
    idx: 0,
    id: null
  }
  config = {
    navigationBarTitleText: '',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fd4344',
    navigationBarTextStyle: 'white',
  }


  componentWillUnmount () { }

  componentDidShow() {
    let { id, name } = this.$router.params
    Taro.setNavigationBarTitle({
      title: name
    })
    this.setState({
      id
    })

    this.props.getAccompanyClassify({
      pageNo: 1,
      pageSize: 10,
      id: id
    })


  }

  swiperChange(e) {
    let idx = e.detail.current
    this.setState({
      idx
    })
  }

  componentDidHide () { }

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />
    }
    let { interval } = this.state
    return (
      <View className='list'>
        <View>
          <View className='swiper-view'>
            <Swiper circular="true" interval={interval} onChange={this.swiperChange.bind(this)}>
              {
                this.props.home.swiper.map(v => {
                  return (
                    <SwiperItem className='swiper-item' key={v.id}>
                      <Image src={v.url} className="slide-image" />
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

          <View className='item-view'>
            {
              this.props.list.listAccompany.map(item => {
                return (
                  <View className='item-accompany' key={item.id}>
                    <Image src={ item.avatar } className='avatar' />
                    <View className='introduce'>
                      <View className='user_info'>
                        <Text className='name'>{ item.name }</Text>
                        <Text className='level'>{ item.level_name }</Text>
                      </View>
                      <View className='second'>
                        <Text>{ item.classify_name }</Text>
                        <Text className='pdlr'>|</Text>
                        <Text>接单量 { item.order_num }</Text>
                      </View>
                    </View>
                    <Text className='price'>{ item.price }RMB</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

export default List
