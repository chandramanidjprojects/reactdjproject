import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image,Modal,Pressable} from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import Users from './Users';
import StatusPosts from './StatusPosts';
import ProfileComments from './ProfileComments';
import StatusComments from './StatusComments';
function StackNavigator({user_id}){
  
  const Stack=createNativeStackNavigator()
  
  return <Stack.Navigator>
   
        <Stack.Screen name='status1' options={{headerShown:false}}>
            {
                (props)=><Users {...props} user_id={user_id}/>
            }
        </Stack.Screen>

        <Stack.Screen name='profilecomments' options={{headerShown:false}}>
            {
                (props)=><ProfileComments {...props} user_id={user_id}/>
            }
        </Stack.Screen>


       <Stack.Screen name='statusposts' options={{headerShown:false}}>
          {
            (props)=><StatusPosts {...props} user_id={user_id}/>
          }
       </Stack.Screen>
       <Stack.Screen name='statuscomments' options={{headerShown:false}}>
          {
            (props)=><StatusComments {...props} user_id={user_id}/>
          }
       </Stack.Screen>
    </Stack.Navigator>
    
}
export default StackNavigator

   





{/* <Stack.Screen name='page1' options={{headerShown:false}}>
            {
                (props)=><Page1 {...props}/>
            }
    </Stack.Screen>
    <Stack.Screen name='page2'>
            {
                (props)=><Page2 {...props}/>
            }
        </Stack.Screen> */}

// const Comments=(props)=>{
//     const [visible,setVisible]=useState(true)
//     return <Modal visible={visible} onRequestClose={()=>{
//         setVisible(false)
//         props.navigation.navigate('status1')       
//            }
//         } animationType='fade'>
//         <Text onPress={()=>{
//             setVisible(false)
//             props.navigation.navigate('status1')
//             }}><Icon name='arrow-back' size={30}/>{props.route.params.id}</Text>
//     </Modal>
// }


// const Page1=({route,navigation})=>{
//     return <View>
//         <Text onPress={()=>navigation.navigate('page2',{roll:'mani'})}>page1</Text>
//     </View>
// }
// const Page2=({route,navigation})=>{
//     console.log(route)
//     return <View>
//         <Text onPress={()=>navigation.navigate('page1')}>page2</Text>
//     </View>
// }