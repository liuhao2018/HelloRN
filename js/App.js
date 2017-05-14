import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    Alert,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from '../js/Home'
import Test1 from '../js/Test1'
import Test2 from '../js/Test2'
import Test3 from '../js/Test3'
import Root from '../js/Root'
import Detail from '../js/Detail'

const SimpleApp = StackNavigator({
    Home: { screen: Home },
    Root:{screen:Root},
    Detail:{screen:Detail}
});

export default SimpleApp