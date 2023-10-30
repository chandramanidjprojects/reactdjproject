import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState}from 'react';
import { TextInput,View,Text,Button } from 'react-native';
import { Base64 } from 'js-base64';
import axios from 'axios'
function Login(props){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
   const SetData=async(acc,ref)=>{
      await AsyncStorage.setItem('access_token',acc)
      await AsyncStorage.setItem('refresh_token',ref)
      let access=await AsyncStorage.getItem('access_token')
      let refresh=await AsyncStorage.getItem('refresh_token')
      let user=JSON.parse(Base64.decode(access.split('.')[1])).user_id
      props.setToken({access:access,refresh:refresh,user_id:user})
   } 
   const LoginHandle=()=>{

      axios.post('http://192.168.43.58:8000/gettoken/',{email:email,password:password})
      .then(res=>SetData(res.data.access,res.data.refresh))
      .catch(err=>console.log(err))
   }
    return <View style={{margin:20}}>
       
      <Text>login here...</Text>
      <TextInput 
         placeholder='enter your email' style={{borderWidth:1,marginBottom:5}}
         onChangeText={(text)=>setEmail(text)}
      />
      <TextInput 
         placeholder='enter your password' style={{borderWidth:1,marginBottom:5}}
         onChangeText={(text)=>setPassword(text)}
      />

      <Button title='login' onPress={LoginHandle}/>
    </View>
  }
  export default Login