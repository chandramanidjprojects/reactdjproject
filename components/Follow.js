import React,{useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import myaxios from './myaxios';
function Follow(props){
  const [follow,setFollow]=useState(false)
  const HandleFollow=async(status)=>{
       setFollow(!follow)
       const res=await(await myaxios()).post('/friends/',{
        notifier_id:props.user_id,
        add_user:props.post_by
    })
    
    
  }
  
  return <View style={{marginLeft:30,marginTop:10}}>
            {
              props.post_by===props.user_id ?
               null
              :
              props.friends.includes(props.user_id) ?
               null
              :
              follow ? <Text onPress={HandleFollow}>unfollow</Text>
               :
               <Text onPress={HandleFollow}>follow</Text>             
            }    
  </View>
}
export default Follow




