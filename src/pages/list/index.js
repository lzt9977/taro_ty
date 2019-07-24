import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Textarea, Picker } from '@tarojs/components'
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
      <View className='post'>
        <View>
          <View class='swiper-view'>
            <Swiper circular="true" interval={interval} onChange={this.swiperChange}>
              {
                this.props.home.swiper.map(v => {
                  return (
                    <Block key={v.id}>
                      <swiper-item class='swiper-item'>
                        <Image src={v.url} class="slide-image" />
                      </swiper-item>
                    </Block>
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

          <View class='item-view'>
            {
              this.props.list.listAccompany.map(item => {
                return (
                  <View class='item-accompany' key={item.id}>
                    <Image src={ item.avatar } class='avatar' />
                    <View class='introduce'>
                      <View class='user_info'>
                        <Text class='name'>{ item.name }</Text>
                        <Text class='level'>{ item.level_name }</Text>
                      </View>
                      <View class='second'>
                        <Text>{ item.classify_name }</Text>
                        <Text class='pdlr'>|</Text>
                        <Text>接单量 { item.order_num }</Text>
                      </View>
                    </View>
                    <Text class='price'>{ item.price }RMB</Text>
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
