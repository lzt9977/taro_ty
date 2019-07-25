import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Canvas } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { NetWork, Loading } from '@components'
import './index.less'

import * as actions from '../../actions/share'

@connect(
  state => state,
  { ...actions }
)
class Share extends Component {

  state = {
    loading: true,
    qrCode: "",
    url: "",
    pixelRatio: 1
  }
  config = {
    navigationBarTitleText: '分享海报'
  }

  componentWillUnmount () { }

  componentDidShow() {

    const that = this
    this.setState({
      pixelRatio: Taro.getSystemInfoSync().pixelRatio
    })
    this.props.getQrCode().then(res => {
      if (res.code == 200) {
        let codeUrl = res.data
        Taro.getImageInfo({
          src: codeUrl,
          success: (qrcode) => {
            this.setState({
              qrcode: qrcode.path
            })
            Taro.getImageInfo({
              src: "https://pc.kuailework.com/klwk-weApp-images/recruit_applet/images2/shareImg/fenxiang1@2x.png",
              success: function (res) {
                Taro.getImageInfo({
                  src: "http://118.24.33.215/share.jpg",
                  success: function (ava) {
                    const ctx = Taro.createCanvasContext('canvas')
                    ctx.setFillStyle('#000')
                    ctx.fillRect(0, 0, 375, 550)
                    // 背景
                    ctx.drawImage(res.path, 0, 0, 375, 550)
                    ctx.drawImage(that.state.qrcode, 375 - 60 - 20, 20, 60, 60)

                    ctx.save();
                    ctx.beginPath()
                    ctx.arc((375) / 2, 230, 20, 0, 2 * Math.PI)
                    ctx.clip()

                    ctx.drawImage(ava.path, (375 - 40) / 2, 210, 40, 40)

                    ctx.restore()

                    ctx.font = 'normal bold 14px sans-serif'
                    ctx.setTextAlign('center')
                    ctx.fillText("ICE", 375 / 2, 280)

                    ctx.font = 'normal bold 14px sans-serif'
                    ctx.setTextAlign('center')
                    ctx.fillText("太棒啦,快来找你喜欢的主播吧", 375 / 2, 310)


                    ctx.draw(false, (e) => {
                      Taro.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 375,
                        height: 550,
                        destWidth: 375 * that.state.pixelRatio,
                        destHeight: 550 * that.state.pixelRatio,
                        canvasId: 'canvas',
                        success: (res) => {
                          that.setState({
                            url: res.tempFilePath,
                            loading: false
                          })
                        }
                      }, this)
                    })
                  }
                })
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        })
      }
    })


  }

  componentDidHide() { }

  previewImage() {
    Taro.previewImage({
      current: this.state.url, // 当前显示图片的http链接
      urls: [this.state.url] // 需要预览的图片http链接列表
    })
  }

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />
    }


    return (
      <View className='share'>

        {
          this.state.loading ? <Loading /> : <View className='content'>
            <Text className='share-text'>点击图片,长按可分享到微信群</Text>
            <Image src={this.state.url} className='imgs' onClick={ this.previewImage }></Image>
          </View>
        }

        <Canvas style="width: 750px; height: 1200px; position: fixed; top: 0; left: 10000px;" canvas-id="canvas"></Canvas>
      </View>
    )
  }
}

export default Share
