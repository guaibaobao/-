

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text, //文本组件
  View, //视图组件
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

var {width, height} = Dimensions.get('window');

var imgUrlList = [
  {uri:'http://img2.3lian.com/2014/c7/12/d/77.jpg'},
  {uri:'http://pic3.bbzhi.com/fengjingbizhi/gaoqingkuanpingfengguangsheyingps/show_fengjingta_281299_11.jpg'},
  {uri:'http://www.bz55.com/uploads1/allimg/120312/1_120312100435_8.jpg'},
  {uri:'http://img3.iqilu.com/data/attachment/forum/201308/21/192654ai88zf6zaa60zddo.jpg'},
  {uri:'http://h.hiphotos.baidu.com/image/h%3D200/sign=fc55a740f303918fc8d13aca613c264b/9213b07eca80653893a554b393dda144ac3482c7.jpg'},
  {uri:'http://img2.pconline.com.cn/pconline/0706/19/1038447_34.jpg'},
]

export default class MyProject extends Component {
  state = {
    currentPageNumber: 0
  }

  renderImage() {
    var allImageList = [];
    for(let i = 0; i < 5; i++) {
      allImageList.push(
        <Image style={styles.imageStyles} key={i} source={imgUrlList[i]}></Image>
      )
    }

    return allImageList;
  }

  renderText() {
    let allTextList = [];
    var style = '';
    for(var i = 0; i < 5; i++) {
      if(i === this.state.currentPageNumber) {
        style = {backgroundColor:'orange'};
      }else {
        style = {backgroundColor:'white'};
      }
      allTextList.push(
        <Text key={i} style={[styles.textStyles, style]}></Text>
      );
    }

    return allTextList;
  }

  onEndDrag = (event)=> {
    var offsetX = event.nativeEvent.contentOffset.x;
    var activePage = Math.ceil(offsetX / width);
    if(activePage >= 4) {
      activePage = 4;
    }
    this.setState({
      currentPageNumber: activePage
    });

    this.startTimer();
  }

  onBeginDrag() {
    console.log("清楚定时器");
    clearInterval(this.timer);
  }

  startTimer() {
    console.log("msg");
    this.timer = null;
    this.timer = setInterval(()=> {
      console.log("msg");
      let activePage = this.state.currentPageNumber + 1;
      if(activePage > 4) {
          activePage = 0;
      }
      let scrollView = this.refs.scrollView;
      let currentX = activePage * width;
      console.log(currentX);
      scrollView.scrollResponderScrollTo('{x:currentX, y:0, animated:true}');
      this.setState({
        currentPageNumber: activePage
      });
    }, 2000);
  }
  componentDidMount() {
    this.startTimer();
  }

  render () {
    return(
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScrollEndDrag={this.onEndDrag}
          onScrollBeginDrag = {this.onBeginDrag}
          ref='scrollView'
        >
          {this.renderImage()}
        </ScrollView>
        <View style={styles.pageListStyles}>
          {this.renderText()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageStyles: {
    width: width
  },
  pageListStyles: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 50,
    width: width,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyles: {
    height: 16,
    width: 16,
    borderRadius: 8,
    marginLeft: 10
  }
});


AppRegistry.registerComponent('MyProject', () => MyProject);

