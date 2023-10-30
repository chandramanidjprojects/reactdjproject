import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import axios from 'axios';
import myaxios from '../myaxios';
function RecentStatus(props){
  useEffect(()=>{
    
  },[])
  return <View>
    <Text>recent status component</Text>
  </View>
}

export default React.memo(RecentStatus)