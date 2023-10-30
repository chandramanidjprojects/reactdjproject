import { Base64 } from 'js-base64';
import React, { useEffect, useState,createContext} from 'react';
import { Image,View,Text, Button,FlatList,Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Menu from './Menu';
import Login from './Login';
import Chat from './Chat';
//import Room from './Room';
//import Users from '../statuscomp/Users';
//import All from '../statuscomp/All';
//import Users from '../statuscomp/Users';
import StackNavigator from '../statuscomp/StackNavigator';
export const Mycontext=createContext()
const Videos=()=>{
    return <View>
        <Text>video component</Text>
    </View>
} 
 
function App(){
  const [count,setCount]=useState(0)
  const [token,setToken]=useState({access:'',refresh:'',user_id:''})
  useEffect(async()=>{
   try{
    let access=await AsyncStorage.getItem('access_token')
    let refresh=await AsyncStorage.getItem('refresh_token')
    let user=null
    if(access && refresh){
      user=JSON.parse(Base64.decode(access.split('.')[1])).user_id
    }
   
    setToken({access:access,refresh:refresh,user_id:user})
   }
   catch(err){
      console.log(err)
   }    

  },[])
  const Tab=createMaterialTopTabNavigator()
  const Update=(tot)=>{
    setCount(tot)
  }
  return <>

  <NavigationContainer>
    {  
       token.refresh ?  
       <Tab.Navigator>
       <Tab.Screen name='status'>
        {
          ()=><StackNavigator  access={token.access} user_id={token.user_id}/>
        }
       </Tab.Screen> 
       {/* <Tab.Screen name='myhome' 
         options={
            
            ()=>({
            
            tabBarIcon:()=><Icon name='home' size={30}/>,
            tabBarShowLabel:false
         })}
       >
          {()=><Home user_id={token.user_id}/>}
       </Tab.Screen> */}
       
       {/* <Tab.Screen name='status'>
        {
          ()=><Users access={token.access} user_id={token.user_id}/>
        }
       </Tab.Screen> */}
      
       <Tab.Screen name='videos'>
           {()=><Videos />}
       </Tab.Screen>
       {/* <Tab.Screen name='all'>
         {
          ()=><All user_id={token.user_id}/>
         }
       </Tab.Screen> */}
       {/* <Tab.Screen name='Chat'
         options={{
          tabBarLabel:()=><View><Text>Chat {count ? count : null}</Text></View>
         }}
        >
           {
           ()=><Chat update={Update}/>
          }
       </Tab.Screen>
        */}
       <Tab.Screen name='Menu'>
           {()=><Menu  token={token} setToken={setToken}/>}
       </Tab.Screen>

   </Tab.Navigator>


   : token.refresh===null ?
   <Tab.Navigator>
      <Tab.Screen name='login'>
          {()=><Login token={token} setToken={setToken}/>}
      </Tab.Screen>    
   </Tab.Navigator> : 
   
   null
    }

  </NavigationContainer>
  </>
}
export default App




