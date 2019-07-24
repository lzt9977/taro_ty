import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { connect, Provider } from "@tarojs/redux";
import * as actions from "@actions/common";
import * as loginActions from "@actions/loginAction";
import Request from './utils/request'

import Index from "./pages/index";

import configStore from "./store";

import "./app.less";
import '@assets/fonts/iconfont.less';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();
// if (process.env.TARO_ENV === 'weapp') {
//   @connect(
//     state => {
//       return {
//         common: state.common,
//         login: state.login
//       }
//     },
//     { ...actions, ...loginActions }
//   )
// }
// 不要对 App 使用 redux 连接   issues有这个问题
class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/user/accompany/index",
      "pages/share/index",
      "pages/user/post/index",
      "pages/login/index",
      "pages/circle/index",
      "pages/circle/detail/index",
      "pages/user/index",
      "pages/classify/index",
      "pages/list/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./assets/images/home.png",
          selectedIconPath: "./assets/images/home_selected.png"
        },
        {
          pagePath: "pages/circle/index",
          text: "电竞圈",
          iconPath: "./assets/images/quan.png",
          selectedIconPath: "./assets/images/quan_selected.png"
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "./assets/images/user.png",
          selectedIconPath: "./assets/images/user_selected.png"
        }
      ],
      color: "#999",
      selectedColor: "#fe692a",
      backgroundColor: "#fafafa",
      borderStyle: "white",
      position: "bottom"
    }
  };

  componentDidMount() {
    Taro.setTabBarBadge({
      index: 1,
      text: "3"
    })

    this.login()
  }

  login() {
    if (process.env.TARO_ENV == 'weapp') {
      Taro.login({
        success: res => {
          const code = res.code;

          Request({ url: "/isMaOpenId", method: "POST", payload: {code} }).then(res => {
            if (res.code == 200) {
              if (res.data) {
                Taro.setStorageSync("token", res.token);
                Taro.setStorageSync("user", res.data);
              } else {
                Taro.clearStorage();
                Taro.navigateTo({
                  url: "/pages/login/index"
                });
              }
            }
          })

        }
      });
    }
    if(process.env.TARO_ENV == 'h5'){ // h5没做登录 直接登录
      Taro.setStorageSync('user', { "id": 169, "nickName": "ice", "mobile": null, "password": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep3biao8GyDemyuQL4ul1jwlsH6vJnDBvW6CXqeqssypfVmCOwj0Hk95lpvQwstds9oZq5tusB7K3g/132", "reg_time": 1560323553, "gender": 1, "city": "Chaoyang", "ma_openId": "ox1tK5PbRgBdeZwW983IFsV1Fp9s", "bean": 8000 })
      Taro.setStorageSync('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2OSwiaWF0IjoxNTYzOTQ5ODY5LCJleHAiOjE1NjQyMDkwNjl9.AqLcaeqYw3CtcuMIGEXfp0G0t-DlC97EztL30rOPaKA')
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
