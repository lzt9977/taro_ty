import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Video } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { NetWork, Loading } from '@components'

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
class CircleDetail extends Component {

  state = {
    id: null,
    loading: true,
    inpPlaceholder: "说出你的想法~",
    inpVal: "",
    focus: false,
    reply: false,
    item: {},
    parentId: null,
  }

  config = {
    navigationBarTitleText: '圈子详情',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fd4344',
    navigationBarTextStyle: 'white',
  }

  componentWillMount() {

  }

  componentWillUnmount () { }

  componentDidShow() {
    this.setState({
      id: this.$router.params.id
    })

    this.getInviteDetail()
    this.getInviteComment()

  }

  getInviteDetail () {
    this.props.getInviteDetail({
      id: this.$router.params.id
    }).then(res => {
      if (res.code == 200) {
        setTimeout(()=>{
          this.setState({
            loading: false
          })
        },1500)
      }
    })
  }

  getInviteComment () {
    this.props.getInviteComment({
      id: this.$router.params.id
    }).then(res => {
      if (res.code != 200) {
        Taro.showToast({
          icon: "none",
          msg: "请求错误"
        })
      }
    })
  }

  // 回复
  postComments (item, id, name) {
    this.setState({
      focus: true,
      reply: true,
      item,
      parentId: id
    })
    this.setState({
      inpPlaceholder: "回复" + name + ":"
    })
  }
  // 评论
  postComment (e) {
    let data = {}
    if (this.state.reply){
      data = {
        invite_id: this.props.circle.invite.id,
        content: e.detail.value,
        parent_id: this.state.parentId,
        receiver_id: this.state.item.user_id
      }
    }else{
      data = {
        invite_id: this.props.circle.invite.id,
        content: e.detail.value,
        parent_id: "",
        receiver_id: ""
      }
    }
    this.submit(data)
  }
  // submit
  submit (data) {
    this.props.postComment(
      data
    ).then(res => {
      if (res.code == 200) {
        this.setState({
          inpVal: null,
          parentId: null,
          item: {},
          inpPlaceholder: "说出你的想法~"
        })
        Taro.showToast({
          title: '评论成功',
          icon: "none"
        })
        this.getInviteComment(this.state.id)
      }
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

    let { invite, comment } = this.props.circle

    return (
      <View className='invite'>
        <View class='bgs'>
          {
            invite.video ? <View  class='image-view'>
              <View class='top'>
                <View class='iconfont icon-huo'></View>TOP 1
              </View>
              <Video class="myVideo" src={ invite.video } controls></Video>
            </View>
            :
            <View class='image-View'>
              <View class='top'>
                <View class='iconfont icon-huo'></View>TOP 1
              </View>
              <Image src={ invite.image } mode="aspectFill" class='image' />
            </View>
          }

          <View class='content'>
            { invite.content }
          </View>
          <View class='time'>
            { invite.create_time }
          </View>
          <View class='agree'>
            <View class='item-agree'>
              <View class='iconfont icon-zan'></View>
              <Text class='num'>{ invite.agree_num }</Text>
            </View>
            <View class='item-agree'>
              <View class='iconfont icon-liuyanguanli'></View>
              <Text class='num'>{ invite.View_num }</Text>
            </View>
          </View>
          <View class='avatar-view'>
            <Image src={ invite.avatar } class='avatar'></Image>
            <View>
              <Text class='accompany_name'>{ invite.accompany_name }</Text>
              <Text class='fans'>粉丝数:{ invite.user_id }</Text>
            </View>
          </View>
        </View>


        <View class='comment'>
          <Text class='tits'>评论(62)</Text>
          {
            comment.map((item, idx)=>{
              return (
                <View key={ item.id }>
                  <View class='comment_list'>
                    <Image src={ item.avatarUrl } class='avatar_comment' />
                    <View class='user'>
                      <Text class='nickName'>{ item.nickName }</Text>
                      <Text class='contents'>{ item.content }</Text>
                      <View class='flexs'>
                        <Text class='times'>{ item.create_time }</Text>
                        <View class='agree1' onClick={ this.postComments.bind(this, item, item.id, item.nickName) }>
                          <View class='item-agree'>
                            <View class='iconfont icon-liuyanguanli'></View>
                            <Text class='ly color'>留言</Text>
                          </View>
                          <View class='item-agree'>
                            <View class='iconfont icon-zan'></View>
                            <Text class='num color'>{ item.agree_num }</Text>
                          </View>
                        </View>
                      </View>
                      {
                        item.list.length > 0 && <View class='comment-vlist'>
                          {
                            item.list.map((q, p)=>{
                              return (<View key={ q.id } class='qs' onClick={ this.postComments.bind(this, q, item.id, item.nickName) }>
                                <Text>{ q.nickName }</Text>
                                { q.user_id != q.receiver_id && <Text>回复了</Text> }
                                { q.user_id != q.receiver_id && <Text>{ q.receiver_name }</Text> }
                                <Text>:</Text>
                                <Text>{ q.content }</Text>
                              </View>)
                            })
                          }
                        </View>
                      }
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>


        <View class='fixed-bottom'>
          <Input placeholder={ this.state.inpPlaceholder } class='postComment' onConfirm={ this.postComment } value={ this.state.inpVal } focus={ this.state.focus } />
        </View>


      </View>
    )
  }
}

export default CircleDetail
