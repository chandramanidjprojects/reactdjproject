import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import PostComments from './PostComments';
import Posts from './Posts';

function PostStack(props){
    let user_id=props.user_id
    const Stack=createNativeStackNavigator()
  return <Stack.Navigator screenOptions={{headerShown:false}}>
     <Stack.Screen name='poststack'>
       {
        ()=><Posts {...props}/>
       }
     </Stack.Screen>
     <Stack.Screen name='Postcomments'>
      {
        (props)=> <PostComments {...props} user_id={user_id}/>
      }
      </Stack.Screen>
  </Stack.Navigator>
}
export default PostStack


