import React ,{useState} from "react";
import {View,Text} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { Mycontext } from "./App";
const Homes=(props)=>{
        
    return <View>
      {console.log('home componet')}
      <Text onPress={props.update}>home component</Text>
    </View>
  }
export default React.memo(Homes) 