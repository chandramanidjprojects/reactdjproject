import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useEffect} from 'react';
import {View,Text,TextInput} from 'react-native';

const Total=()=>{
    return <View>
        <Text>total component</Text>
    </View>
}

function RenderAllStatus(props){
  useEffect(()=>{
   return  ()=>{
    console.log('render all status un mounted.....')
   }
  },[])
  return <View>
    <Text>rendering all status</Text>
    <View>
      <TextInput placeholder='enter something here...'/>
    </View>
  </View>
  
}
export default RenderAllStatus

