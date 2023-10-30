import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image} from 'react-native';
import myaxios from '../components/myaxios';
import RenderStatus from './RenderStatus';
import axios from 'axios';

function RenderNewUsers(props){
  const [follow,setFollow]=useState(false)
  const HandleFollow=async()=>{
    const res=await(await myaxios()).post('/friends/',{
        notifier_id:props.user_id,
        add_user:props.item.id
      })
     setFollow(!follow)
  }
  return <View style={{margin:5}}>
    <Text>{props.item.username}</Text>
    <Image source={{uri:props.item.profile}} style={{height:400}}/>

    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Text>like</Text>
        <Text>comments</Text>
        <Text>Share</Text>
        {
            follow ? <Text onPress={HandleFollow}>unFollow</Text> : <Text onPress={HandleFollow}>Follow</Text>
        }
    </View>
  </View>
}
export default RenderNewUsers