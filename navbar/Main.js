import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import Logout from './Logout';
import Posts from './posts/Posts';
import PostStack from './posts/PostStack';
import StatusStack from './status/StatusStack';
const Tab=createMaterialTopTabNavigator()
function Main({setToken,user_id}){

  return <NavigationContainer>
           <Tab.Navigator >

            <Tab.Screen name='Posts'> 
             {
                (props)=><PostStack {...props} user_id={user_id}/>
             }
            </Tab.Screen>
            <Tab.Screen name='Status'>
              {
                (props)=><StatusStack />                
              }
            </Tab.Screen> 
            <Tab.Screen name='Menu'>
                {
                    (props)=><Logout {...props} setToken={setToken}/>
                }
            </Tab.Screen>

           </Tab.Navigator>  
         </NavigationContainer>
}
export default Main

