import React,{useEffect,useState} from 'react';
import {View,Text,Image} from 'react-native';
import { Api } from './Posts';
import myaxios from '../myaxios';
function AddFriend(props){
    const [follow,setFollow]=useState(false)
    const HandleFollow=async(post_by)=>{
        setFollow(!follow)
        const res=await(await myaxios()).post('/friends/',{
         notifier_id:props.user_id,
         add_user:post_by
     })
     
     
   }
return <Api.Consumer>
    {
      (data)=>data.post_by===props.user_id ?
         null
        :
        data.friends.includes(props.user_id) ?
         null
        :
        follow ? <Text onPress={()=>HandleFollow(data.post_by)}>remove</Text>
         :
         <Text onPress={()=>HandleFollow(data.post_by)}>AddFriend</Text>             

    }
  </Api.Consumer>
}
export default AddFriend
