import React,{useEffect}from 'react';
import { TextInput,View,Text,Button, Pressable } from 'react-native';

function Register(){
    
    return <View style={{margin:20}}>
      
      <Text>create account here...</Text>
      <TextInput placeholder='enter email address' style={{borderWidth:2,marginBottom:5}}/>
      <TextInput placeholder='enter password' style={{borderWidth:2,marginBottom:5}}/>
      <Button title='Submit'/>

      

    </View>
  }
  export default Register