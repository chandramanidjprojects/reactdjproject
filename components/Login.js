import React, { useEffect, useState} from 'react';
import { View,Text, Button,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base64 } from 'js-base64';
const Login=(props)=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    useEffect(()=>{

    })
    
    const HandleLogin=async()=>{
      try{
        let resp=await axios.post('http://192.168.43.58:8000/gettoken/',{email:email,password:password}) 
        await AsyncStorage.setItem('access_token',await resp.data.access)
        await AsyncStorage.setItem('refresh_token',await resp.data.refresh)
        let access=await AsyncStorage.getItem('access_token')
        let refresh=await AsyncStorage.getItem('refresh_token')
        let user_id=JSON.parse(Base64.decode(refresh.split('.')[1])).user_id
        props.setToken({access:access,refresh:refresh,user_id:user_id})
      }
      catch(err){
        console.log(err.response)
      }

    }
     return <View style={{margin:5}}>
      
        <Text>Login here ....</Text>
        <TextInput style={{borderWidth:1,borderColor:'black',marginBottom:5}}
           placeholder='enter your email address'
           onChangeText={setEmail}        
        />
        <TextInput style={{borderWidth:1,borderColor:'black',marginBottom:5}}
           placeholder='enter your password'
           onChangeText={setPassword}        
        />

        <Button 
           title="login"
           onPress={HandleLogin}
        />
    </View>
}
export default Login