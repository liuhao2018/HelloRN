/**
 * Created by liuhao on 2017/5/14.
 */
import React ,{Component} from 'react'
import {StyleSheet,WebView, View,Alert,ActivityIndicator,RefreshControl,Dimensions} from 'react-native'

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

export default class Detail extends Component{
    // 构造
      constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              isShow:1
          };

      }
    static navigationOptions = {
        title: 'Detail',
    }
      componentWillMount(){

      }

      render(){
                  return(
                      <View style={styles.container}>
                          <WebView source={{uri:this.props.navigation.state.params.url}} onLoadEnd={()=>{this.setState({isShow:0})}}/>
                          <ActivityIndicator size='large' style={{width:100,height:60,opacity:this.state.isShow,position:'absolute',left:w/2-50,top:h/2-50}}/>
                      </View>
                  );
          }


      componentDidMount(){

      }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    }
})