//"firebase": "^9.8.4",
import { View,Text } from "react-native";
function App(){
    return <View>
           <Text>hii</Text>
    </View>
}
export default App

























// import { NavigationContainer, useFocusEffect, useScrollToTop } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React, { useEffect, useState,useLayoutEffect,useRef } from 'react';
// import { View,Text,FlatList,SafeAreaView,ScrollView, 
//   RefreshControl,
//   Dimensions,
//   VirtualizedList
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Login from './Login';
// import Register from './Register' 
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import  Icon  from 'react-native-vector-icons/Ionicons';
// import Menu from './Menu';
// import VideoComponents from './VideoComponents'
// import Homes from './HomeScreen!';
// function App(){
//   const [token,setToken]=useState('')
//   const [name,setName]=useState('mani')
//   const GetToken=async()=>{
//     let val=await AsyncStorage.getItem('access_token')
    
//     setToken(val)
//   }

//   useEffect(()=>{
//    GetToken()      
//   },[])
//  const Logo=(props)=>{
//     return <Icon name='home' size={30}/>
//  }
//   if(token){

//     const Tab = createMaterialTopTabNavigator()
//     return <NavigationContainer>
//              <Tab.Navigator >
//                 <Tab.Screen name='home' 
//                 options={()=>({
//                   title:(props)=><Logo {...props}/>
//                 })}
//                 >
//                   {()=><Homes />}
//                 </Tab.Screen>

//                 <Tab.Screen name='video'
//                  options={()=>({
//                   title:()=><Icon name='tv' size={30}/>
//                 })}
//                 >
//                   {()=><VideoComponents />}
//                 </Tab.Screen>

              
//                <Tab.Screen name='menu' component={Menu}
//                 options={()=>({
//                   title:()=><Icon name='ios-menu' size={30}/>
//                 })}
//                />
//              </Tab.Navigator>
//     </NavigationContainer>
//   }
//   else if(token===null){
//     return <>
//        <Login setToken={setToken}/> 
//         <Register/> 
      
      

//     </>
//   }
//   else{
//     return <View></View>
//   }
// }
// export default App


























