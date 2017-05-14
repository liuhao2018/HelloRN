/**
 * Created by liuhao on 2017/5/13.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    ListView,
    ToastAndroid,
    ActivityIndicator,
    Dimensions,
    TouchableNativeFeedback,
    Image,
    RefreshControl,
} from 'react-native';

const defaultImg = 'http://i1.piimg.com/1949/53b29047f9ba1d43.jpg';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const url = 'http://gank.io/api/data/Android/200/1';

import { StackNavigator } from 'react-navigation';
export default class Home extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          var dataSource = new ListView.DataSource({rowHasChanged:(oldrow,newrow)=>{oldrow !== newrow}});

          this.state = {
              mydata:[],
              ds:dataSource,
              showLoading:true
          };
      }
      componentWillMount(){
          this.fetchData()
      }

    _renderRow(item, sectionID, rowID){

    }
    static navigationOptions = {
        title: 'Gank',
    }
      render(){
          if(!this.state.showLoading){
              return (
                  <View style={styles.container}>
                      <ListView style={styles.listview} dataSource={this.state.ds} renderRow={(item,sectionID,rowID)=>{
                          return (<TouchableNativeFeedback onPress={()=>{this.props.navigation.navigate('Detail',{url:item.url})}}>
                              <View style={styles.item}>
                                  <Image style={styles.img} source={{uri:item['images']? item['images'][0]:defaultImg}} resizeMode='cover'/>
                                  <View style={{flex:1}}>
                                      <Text style={styles.text}>{item['desc']}</Text>
                                      <View style={{flexDirection:'row'}}>
                                          <Text style={styles.provide}>{item['who']?item['who']:'Gank'}</Text>
                                          <Text style={styles.time}>{item['publishedAt'].substring(0,10)}</Text>
                                      </View>
                                  </View>
                              </View>
                          </TouchableNativeFeedback>);
                      }} enableEmptySections={true}/>
                  </View>
              );
          }else {
              return(
                  <View style={styles.container}>
                      <ActivityIndicator size='large'/>
                  </View>
              );
          }
      }



      componentDidMount(){

      }

    fetchData(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = xhr.responseText;
                var obj = JSON.parse(response);
                var array = [];
                for(var i=0;i<obj['results'].length;i++){
                    array.push(obj['results'][i])
                }
                this.setState({
                    mydata:array,
                    ds:this.state.ds.cloneWithRows(array),
                    showLoading:!this.state.showLoading
                })
            }
        }
        xhr.open('GET',url);
        xhr.send();
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#eee',
    },
    item:{
        width:w,
        height:100,
        flexDirection:'row',
        backgroundColor:'#fff',
        padding:10,
        marginTop:4,
        marginBottom:4,
    },
    text:{
        flex:1,
        color:'#333',
        fontSize:14,
    },
    img: {
        width:70,
        height:70,
        marginRight:5
    },
    provide:{
        fontSize:12,
        marginBottom:8
    },
    time:{
        fontSize:12,
        marginBottom:8,
        position:'absolute',
        right:10,
        bottom:10
    },
    progress:{
        alignItems:'center',
        justifyContent:'center',
    }
});

