import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image,Modal,Pressable,Dimensions} from 'react-native';
import Video from 'react-native-video';
import Follow from './Follow';
import ProfileLike from './ProfileLike';
import StatusLike from './StatusLike';
import { useFocusEffect } from '@react-navigation/native';
const height=Dimensions.get('window').height * (3/5)
const formats=['mp4','3gp']
const GetFormat=(url)=>{
  let arr=url.split('.')
  let len=arr.length-1
  let format=arr[len]
  if(formats.includes(format)){
     return true
  }
  else{
     return false
  }
}
function RenderStatus(props){
  const [focus,setFocus]=useState(true)
  useFocusEffect(
    React.useCallback(()=>{
       setFocus(true)
       return ()=>{
       setFocus(false)
      }
    },[])
   )  

  return <View style={{height,margin:5,marginBottom:50,justifyContent:'space-between'}}>
  {
    props.item.first_status ? 
    GetFormat(props.item.first_status.file) ?
    <View>
      <Pressable onPress={()=>props.navigation.navigate('statusposts',{id:props.item.id})}>
      <Video style={{height}}
        source={{uri:`http://192.168.43.58:8000${props.item.first_status.file}`}}
        resizeMode='cover'
        controls={true}
        paused={props.paused===props.item.id && focus ? false : true}
      /> 
      </Pressable>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <StatusLike {...props}/>

          <Text onPress={()=>props.navigation.navigate('statuscomments',{id:props.item.first_status.id})}>comments</Text>   
          <Text>share</Text>   
          <Follow {...props}/>
        </View>
    </View>
      :
        <>
        <Pressable onPress={()=>props.navigation.navigate('statusposts',{id:props.item.id})}>
         <Text>{props.item.first_status.name} posts his status</Text>
         <Image source={{uri: `http://192.168.43.58:8000${props.item.first_status.file}/`}}
          style={{height,
          borderRadius:5              
        }}/>
        </Pressable>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <StatusLike {...props}/>
          <Text onPress={()=>props.navigation.navigate('statuscomments',{id:props.item.first_status.id})}>comments</Text>   
          <Text>share</Text>   
          <Follow {...props}/>
        </View>
        
        </>
    : 

      <View style={{height}}>
      <Pressable onPress={()=>props.navigation.navigate('statusposts',{id:props.item.id})}>
          <Text>{props.item.username} updated his profile picture</Text>
          <Image source={{uri:props.item.profile}} 
           style={{height:height*(3/3)-50,borderRadius:200,resizeMode:'cover'}}  />
        </Pressable>   
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
           <ProfileLike {...props}/>   
           <Text onPress={()=>{
                        props.navigation.navigate('profilecomments',{id:props.item.id})
                        
           }}
           
           >comments</Text>
          <Text>share</Text>   
          <Follow {...props}/>
        </View>

      </View>

  }
</View>
}
export default React.memo(RenderStatus)

