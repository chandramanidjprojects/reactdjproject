import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image,Modal,Pressable} from 'react-native';
import axios from 'axios';
import myaxios from '../components/myaxios';
import Comm from './statuscomments/Comm';
import { Dimensions } from 'react-native';
import Video from 'react-native-video';
const height=Dimensions.get('window').height-30
const GetFormat=(url)=>{
  let arr=url.split('.')
  let len=arr.length-1
  let format=arr[len]
  let formats=['mp4','3gp']
  if(formats.includes(format)){
     return true
  }
  else{
     return false
  }
}

function RenderEveryStatus(props){
  const [open,setOpen]=useState(false)
  return <View>
      {
         GetFormat(props.item.file) ? 
         <Video style={{height:height}}
         source={{uri:`http://192.168.43.58:8000${props.item.file}`}}
         resizeMode='cover'
         controls={true}
         repeat={true}
         paused={props.paused || open}
       /> 
         :
         <>
         <Image source={{uri:`http://192.168.43.58:8000${props.item.file}`}} style={{height,
          
        }} resizeMethod='auto' resizeMode='stretch'/>
                  </>
      }
    <View style={{position:'absolute',top:300,right:0}}>
    
     {
       props.item.like_ids.includes(props.user_id) ?
         <Text style={{color:'green',
         backgroundColor:'white',position:'absolute',top:10,left:20
        }}>likes {props.item.like_ids.length}</Text>
         :
         <Text style={{backgroundColor:'white',position:'absolute',top:10,left:20}}>likes {props.item.like_ids.length}</Text>
     }

        <Text onPress={()=>setOpen(true)}
           style={{backgroundColor:'white',position:'relative',top:140}}
        >comments</Text>
        {
          open ?
          <Comm setOpen={setOpen} open={open} {...props} status_id={props.item.id}/> : null
        }
       <Text style={{backgroundColor:'white',position:'absolute',top:100,left:20}}>share</Text>
    </View>

    </View>

}
export default React.memo(RenderEveryStatus)












/*
 return <View style={{flexDirection:'row',justifyContent:'space-around'}}>
    
    {
        props.item.like_ids.includes(props.user_id) ?
    <Text style={{color:'green'}}>likes {props.item.like_ids.length}</Text>
    :
    <Text>likes {props.item.like_ids.length}</Text>
    }

    <Text>comments</Text>
    <Text>share</Text>
  </View>
*/

