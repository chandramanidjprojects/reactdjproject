import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View,Text,Pressable,Button} from 'react-native';

function Logout(props){
    const HandleLogout=async()=>{
        
     try{
        await AsyncStorage.removeItem('access_token')
        await AsyncStorage.removeItem('refresh_token')
        
     }
       catch(err){}
    }
  return <View>

     <Button onPress={HandleLogout} title="Logout"/>
  </View>
}
export default Logout

