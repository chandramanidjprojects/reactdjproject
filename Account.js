import React,{Component} from 'react';
import { View,Text,Button } from 'react-native';

const Account=({navigation})=>{
  
  return <View>
    <Text>Account Page </Text>
   <Button title='Go to Details' onPress={()=>{navigation.navigate('Details')}}></Button>
  </View>
}
export default Account

