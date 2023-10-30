import { useFocusEffect } from '@react-navigation/native';
import React,{Component, useEffect, useState} from 'react';
import {View,Text,Image} from 'react-native';
import Video from 'react-native-video';
import Comments from './Comments';
import Likes from './Likes';
import Share from './Share';
import Chat from './Chat';
import Follow from './Follow';
const formats=['mp4','3gp']
function RenderHomeComponents({item,paused,setModalVisible,setPaused,user_id}){
  const [focus,setFocus]=useState(true)
  useFocusEffect(
   React.useCallback(()=>{
      setFocus(true)
      return ()=>{
      setFocus(false)
     }
   },[])
  )  
    const VideoFormats=(url)=>{
      const arr=url.split('.')
      const len=arr.length-1
      const format=arr[len]
      if(formats.includes(format)){
        return true
      }
      else{
        return false
      }
    }
     return <View style={{margin:5}}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:3}}>
          <Image source={{uri:item.get_post_by_info.profile}} style={{width:50,height:50,borderRadius:25}}/>
          <Text style={{marginTop:15}}>{item.get_post_by_info.name} {paused}</Text>
        </View>
       {
        VideoFormats(item.file) ?
        <Video style={{height:400,borderRadius:8}}
        source={{uri:item.file}}
        resizeMode='cover'
        paused={item.id===paused && focus? false : true}
        repeat={item.id===paused && focus? true : false}
        controls={true}
     /> :
     <Image 
        style={{height:400,borderRadius:8}}
        source={{uri:item.file}}
     />
       } 

        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',paddingTop:10}}>
         <Likes likes={item.postlike_set} item={item}/>
         <Comments focus={setFocus} item={item} setModalVisible={setModalVisible} setPaused={setPaused}/>
         <Share />
        </View>
        <Follow post_by={item.post_by} friends={item.friends} user_id={user_id}/>

     </View>
}
export default React.memo(RenderHomeComponents)




