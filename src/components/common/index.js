import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect, Provider } from "@tarojs/redux";
import * as actions from "@actions/common";
import * as loginActions from "@actions/loginAction";

@connect(
  state => {
    return {
      common: state.common,
      login: state.login
    }
  },
  { ...actions, ...loginActions }
)

class Common extends Component {

  componentWillMount() {
    if(process.env.TARO_ENV == 'weapp'){
      Taro.getNetworkType({
        success: res => {
          const networkType = res.networkType;
          if (networkType === "none") {
            this.props.UpdateNetWorkStatus(false);
          } else {
            this.props.UpdateNetWorkStatus(true);
          }
        }
      });

      // 网络状态发生变化
      Taro.onNetworkStatusChange(res => {
        if (!res.isConnected) {
          this.props.UpdateNetWorkStatus(false);
        } else {
          this.props.UpdateNetWorkStatus(true);
        }
      });
    }
  }

  render () {
    return (
      <View class='common'></View>
    )
  }
}
export default Common
