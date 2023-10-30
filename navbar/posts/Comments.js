import React,{useEffect} from 'react';
import {View,Text,Image} from 'react-native';

function Comments(props){
  return <View>
    <Text onPress={()=>props.navigation.navigate('Postcomments',{id:props.item_id,post_by:props.post_by})}>comments</Text>
  </View>
}
export default Comments
