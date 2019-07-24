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
class Post extends Component {

  state = {
    textarea: "",
    picList: [],
    accompany: [{ name:"请选择账号", id:0}],
    index: 0,
    look: true
  }
  config = {
    navigationBarTitleText: '发布动态',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fd4344',
    navigationBarTextStyle: 'white',
  }


  componentWillUnmount () { }

  componentDidShow() {
    let arr = this.state.accompany
    arr.push(...this.props.home.accompany)
    this.setState({
      accompany: arr
    })
  }
  bindTextAreaBlur(e) {
    this.setState({
      textarea: e.detail.value
    })
  }

  bindPickerChange(e) {
    let idx = e.detail.value
    this.setState({
      index: idx
    })
  }

  chooseImage() {
    let picList = this.state.picList
    Taro.chooseImage({
      count: 9 - this.state.picList.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (e) => {
        e.tempFilePaths.map(i=>{
          Taro.uploadFile({
            url: 'http://118.24.33.215:8888/images/upload',
            filePath: i,
            name: 'file',
            header: {
              'Content-Type': 'multipart/form-data',
            },
            success: (res) => {
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data)
                picList.push(data.data)
                this.setState({
                  picList
                })
              }
            }
          })
        })
      }
    })
  }

  submit () {
    if(!this.state.look){
      return
    }
    this.setState({
      look: false
    })
    if(!this.state.textarea){
      Taro.showToast({
        title: '请输入这一刻的想法',
        icon: "none"
      })
      return
    }
    if(this.state.picList.length == 0){
      Taro.showToast({
        title: '请选择一张图片',
        icon: "none"
      })
      return
    }
    if (this.state.index == 0){
      Taro.showToast({
        title: '请选择账号',
        icon: "none"
      })
      return
    }
    this.props.invitePost({
      content: this.state.textarea,
      images: this.state.picList.join(","),
      accompanyId: this.state.accompany[this.state.index].id,
      accompanyName: this.state.accompany[this.state.index].name,
      avatar: this.state.accompany[this.state.index].avatar,
    }).then(res => {
      if (res.code == 200) {
        Taro.switchTab({
          url: '/pages/user/index',
        })
        this.setState({
          look: true
        })
      }
      Taro.showToast({
        title: res.msg,
      })
    })
  }

  componentDidHide () { }

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />
    }
    return (
      <View className='post'>
        <Textarea onInput={this.bindTextAreaBlur} class='textarea' placeholder-class='placeholder' placeholder="这一刻的想法..." />

        <View class='pic-content'>
          {
            this.state.picList.map(i => {
              return (
                <View class='item' key={i}>
                  <Image src={ i } mode="aspectFill"></Image>
                </View>
              )
            })
          }

          {this.state.picList.length < 9 && <View class='addPic item chooseImage' onClick={this.chooseImage}><View class='iconfont icon-jia'></View></View> }
        </View>

        <View class='inp-view'>
          <Picker onChange={this.bindPickerChange} value={this.state.index} range-key="name" range={this.state.accompany}>
            {
              this.state.accompany[this.state.index].name == '请选择账号' ?
              <View class="picker placeholder">
                {this.state.accompany[this.state.index].name}
              </View> :
              <View class="picker">
                  {this.state.accompany[this.state.index].name}
              </View>
            }
          </Picker>
        </View>

        <View class='submit' onClick={this.submit}>发表</View>
      </View>
    )
  }
}

export default Post
