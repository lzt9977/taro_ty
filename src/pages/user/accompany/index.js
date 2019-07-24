import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Textarea, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { NetWork } from '@components'
import './index.less'

import * as actions from '../../../actions/user'


@connect(
  state => {
    return {
      common: state.common,
      home: state.home
    }
  },
  { ...actions }
)
class Accompany extends Component {

  state = {
    index: 0,
    classify: [],

    index1: 0,
    hourPrice: [],

    avatarUrl: "",
    multiShow: false,

    name: "",
    mobile: "",
    level_name: "",
    introduce: ""
  }
  config = {
    navigationBarTitleText: '成为陪主',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fd4344',
    navigationBarTextStyle: 'white',
  }


  componentWillUnmount () { }

  componentDidShow() {
    let userInfo = Taro.getStorageSync("user")

    let hourPrice = ["请选择小时价位"]
    for(let i = 1,len = 25;i <= len; i++){
      hourPrice.push(i*20)
    }

    this.setState({
      hourPrice,
      avatarUrl: userInfo.avatarUrl,
      classify: [{ name:"请选择陪玩游戏", id:0 }, ...this.props.home.classify]
    })

  }

  bindPickerChange (e) {
    let idx = e.detail.value
    this.setState({
      index: idx
    })
  }

  bindPickerChange1(e) {
    let idx = e.detail.value
    this.setState({
      index1: idx
    })
  }

  inp(name, e) {
    this.setState({
      [name]: e.detail.value
    })
  }

  chooseImage () {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(e) => {
        Taro.uploadFile({
          url: 'http://118.24.33.215:8888/images/upload',
          filePath: e.tempFilePaths[0],
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
          },
          success: (res) => {
            if (res.statusCode == 200) {
              let data = JSON.parse(res.data)
              this.setState({
                avatarUrl: data.data
              })
            }
          }
        })
      }
    })
  }


  submit() {
    if(!this.state.name){
      Taro.showToast({
        title: '请输入陪主名称',
        icon: "none"
      })
      return
    }
    if (!this.state.avatarUrl) {
      Taro.showToast({
        title: '请上传头像',
        icon: "none"
      })
      return
    }
    if (!this.state.mobile) {
      Taro.showToast({
        title: '请输入手机号码',
        icon: "none"
      })
      return
    }
    if (!this.state.classify[this.state.index].name || this.state.classify[this.state.index].name == '请选择陪玩游戏') {
      Taro.showToast({
        title: '请选择陪玩游戏',
        icon: "none"
      })
      return
    }
    if (!this.state.level_name) {
      Taro.showToast({
        title: '请填写游戏段位',
        icon: "none"
      })
      return
    }
    if (!this.state.introduce) {
      Taro.showToast({
        title: '请输入自我介绍',
        icon: "none"
      })
      return
    }
    if (!this.state.hourPrice[this.state.index1] || this.state.hourPrice[this.state.index1] == '请选择小时价位') {
      Taro.showToast({
        title: '请选择小时价位',
        icon: "none"
      })
      return
    }

    this.props.accompanyRegister({
      name: this.state.name,
      avatar: this.state.avatarUrl,
      mobile: this.state.mobile,
      classify_name: this.state.classify[this.state.index].name,
      classify_id: this.state.classify[this.state.index].id,
      level_name: this.state.level_name,
      introduce: this.state.introduce,
      price: this.state.hourPrice[this.state.index1]
    }).then(res => {
      if (res.code == 200) {
        Taro.switchTab({
          url: '/pages/user/index',
        })
      }
      Taro.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  }

  componentDidHide () { }

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />
    }
    let { classify, index, hourPrice, index1, avatarUrl,  } = this.state
    return (
      <View className='post'>
        <View class='accompany-list'>
          <Text class='label'>陪主名称</Text>
          <View class='inp-view'>
            <Input placeholder="请输入陪主名称" placeholder-class='placeholder' onInput={this.inp.bind(this, "name")}/>
          </View>
        </View>
        <View class='accompany-list'>
          <Text class='label'>陪主头像</Text>
          <View class='inp-view'>
            <Text class='tips'>点击头像可重新上传</Text>
            <Image src={avatarUrl} class='avatar' onClick={this.chooseImage} />
          </View>
        </View>
        <View class='accompany-list'>
          <Text class='label'>手机号码</Text>
          <View class='inp-view'>
            <Input placeholder="请输入手机号码" maxlength='11' onInput={this.inp.bind(this, "mobile")} placeholder-class='placeholder'/>
          </View>
        </View>
        <View class='accompany-list'>
          <Text class='label'>陪玩游戏</Text>
          <View class='inp-view'>
            <Picker onChange={this.bindPickerChange} value={index} range-key="name" range={classify}>
              {
                classify[index].name == '请选择陪玩游戏' ?
                <View class="picker placeholder">
                    {classify[index].name}
                </View> : <View class="picker">
                  {classify[index].name}
                </View>
              }
            </Picker>
          </View>
        </View>
        <View class='accompany-list'>
          <Text class='label'>游戏段位</Text>
          <View class='inp-view'>
            <Input placeholder="请填写游戏段位" onInput={this.inp.bind(this, "level_name")} placeholder-class='placeholder'/>
          </View>
        </View>
        <View class='accompany-list'>
          <Text class='label'>自我介绍</Text>
          <View class='inp-view'>
            <Input placeholder="写一句自我介绍拉客吧..." placeholder-class='placeholder' onInput={this.inp.bind(this, "introduce")}/>
          </View>
        </View>
        <View class='accompany-list'>
          <Text class='label'>小时价位</Text>
          <View class='inp-view'>
            <Picker onChange={this.bindPickerChange1} value={index1} range={hourPrice}>
              {
                hourPrice[index1] == '请选择小时价位' ? <View class="picker placeholder">
                    {hourPrice[index1]}
                </View> :
                <View class="picker">
                    {hourPrice[index1]}
                </View>
              }
            </Picker>
          </View>
        </View>

        <View class='submit' onClick={this.submit}>
          提交审核
        </View>
        <View class='tips_text'>
          一个微信账号可注册多个陪主账号,暂时无限制
        </View>
      </View>
    )
  }
}

export default Accompany
