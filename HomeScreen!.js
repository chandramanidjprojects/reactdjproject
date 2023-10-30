import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import React,{Component,useEffect,useState} from 'react';
import {Text,View} from 'react-native';

import Main from './RenderHomeComponents'


function Homes(){
  const [focused,setFocused]=useState(false)


  useFocusEffect(
    React.useCallback(()=>{
       setFocused(true)
       return ()=>{
         setFocused(false)
       }
    },[])
)

return <>
{
  focused ? <Main  method='get' url='/posts/' focused={focused} /> :null 
}
     
      </>
}
export default Homes




