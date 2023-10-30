import React, { useEffect, useState} from 'react';
import { View,Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Menu=(props)=>{
    const HandleLogout=async()=>{
          await AsyncStorage.removeItem('access_token')
          await AsyncStorage.removeItem('refresh_token')
          let access=await AsyncStorage.getItem('access_token')
          let refresh=await AsyncStorage.getItem('refresh_token')   
          props.setToken({access:access,refresh:refresh})
      }
    return <View>
          <Text>menu component</Text>
          <Button 
             title="logout"
             onPress={HandleLogout}
          />
      </View>
  }
  export default Menu
  