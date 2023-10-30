import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image,Modal,Pressable} from 'react-native';
import myaxios from '../components/myaxios';

function StatusLike(props){
  const [like,setLike]=useState({like:false,count:0})
  const HandleLike=async(id,status)=>{
    if(status){
      const res=await(await myaxios()).delete('/status_likes/'+id+'/')
      setLike({like:!like.like,count:like.count-1})
    }
    else{

     const res=await(await myaxios()).post('/status_likes/',{
      like_by:props.user_id,like_to:id
    })
     setLike({like:!like.like,count:like.count+1})
    }

  }
  return <View>
    {
        props.item.first_status.like_ids.includes(props.user_id) ? 
          <Text onPress={()=>HandleLike(props.item.first_status.id,!like.like)} style={{color:!like.like ? 'green':'black'}}>like {props.item.first_status.like_ids.length+like.count}</Text> 
          
          : 
          
          <Text onPress={()=>HandleLike(props.item.first_status.id,like.like)} style={{color:like.like ? 'green':'black'}}>like {props.item.first_status.like_ids.length+like.count}</Text>
    }
  </View>
}
export default StatusLike







