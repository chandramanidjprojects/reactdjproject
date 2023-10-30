import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image} from 'react-native';
import myaxios from '../components/myaxios';

function Follow(props){
  const [follow,setFollow]=useState(true)
  const HandleFollow=async()=>{
    const res=await(await myaxios()).post('/friends/',{
      notifier_id:props.user_id,
      add_user:props.item.id
    })
   setFollow(!follow)
  }
  return <View>
    {
    follow ? <Text  onPress={HandleFollow}>unfollow</Text> : <Text onPress={HandleFollow}>Follow</Text>
    }

  </View>
}
export default Follow

