import { useFocusEffect } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import {View,Text,Pressable, FlatList} from 'react-native';
import Videos from './Videos';
import Axios from './Axios';
function VideoComponents(){
  const [focus,setFocus]=useState(false)
  useFocusEffect(
    React.useCallback(()=>{
         setFocus(true)
       
       return ()=>{
        setFocus(false)
       }
    },[])
  )
  return <>
   {focus ? <Videos  method='get' url='/posts/' focus={focus}/> : null}
   </>
}

export default VideoComponents
