import {View,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
import React,{ useEffect, useState } from 'react';
import myaxios from './myaxios';
import  Icon  from 'react-native-vector-icons/Ionicons';
const Likes=({likes,item})=>{
    const [userId,setUserId]=useState(null)
    const [like,setLike]=useState({click:true,count:0})
    useEffect(()=>{
      const getUserId=async()=>{
        const ref=await AsyncStorage.getItem('refresh_token')
        const id=JSON.parse(Base64.decode(ref.split('.')[1])).user_id
        setUserId(id)
      }
      getUserId()
    },[])
   const HandleLike=async(id,status)=>{
         if(status){
            
            setLike({click:!like.click,count:like.count+1})
            const ax=await(await(myaxios())).post('/post_likes/',{like_by:userId,like_to:id})              
            console.log(ax.data) 
          }
          else{
            
            setLike({click:!like.click,count:like.count-1})
            const ax=await(await(myaxios())).delete('/post_likes/'+id+'/')
            console.log(ax.data)
          }
   }
    
    return <View>
       {  
          likes.find(item=>item.like_by===userId) ?
          <Text style={{color:like.click ? 'green' : 'black'}}
            onPress={()=>HandleLike(item.id,!like.click)}
          >likes <Icon name='thumbs-up-sharp' size={20}/> {likes.length+like.count}</Text> :
          <Text style={{color:! like.click ? 'green' : 'black'}}
            onPress={()=>HandleLike(item.id,like.click)}          
          >likes <Icon name='thumbs-up-sharp' size={20}/> {likes.length+like.count}</Text> 
       }
       
    </View>
 }
 export default React.memo(Likes)

 