import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { NetWork, Loading } from "@components";

import * as actions from "../../actions/common";
import './index.less'

@connect(
  state => state,
  { ...actions }
)
class Classify extends Component {
  state = {
    loading: true
  };
  config = {
    navigationBarTitleText: "游戏分类"
  };

  componentWillUnmount() {}

  componentDidShow() {
    this.props.getClassify().then(res => {
      if (res.code == 200) {
        this.setState({
          loading: false
        });
      }
    });
  }

  componentDidHide() {}

  render() {
    if (!this.props.common.networkStatus) {
      return <NetWork />;
    }


    return (
      <View className="classify">

        {
          this.state.loading ? <Loading /> : <View class="classify-item">
            {this.props.common.classify.map((v, i) => {
              return (
                <View class="item" key={v.id}>
                  <Image src={v.icon} class="icon"/>
                  <Text>{v.name}</Text>
                </View>
              );
            })}
          </View>
        }

      </View>
    );
  }
}

export default Classify;
