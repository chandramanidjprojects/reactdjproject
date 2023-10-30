import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useEffect,useState,createContext} from 'react';
import {View,Text} from 'react-native';
import Login from './Login';
import Main from './Main';
import Storage from './Storage';
const RegistrationContainer=createMaterialTopTabNavigator()
function App(){
  const [token,setToken]=useState({access:'',refresh:'',user_id:null})  
  useEffect(async()=>{
    let storage=await Storage()
    setToken({access:storage.access_token,refresh:storage.refresh_token,user_id:storage.user_id})  
  },[])  
  return token.refresh ? <Main setToken={setToken} user_id={token.user_id}/> : 
            token.refresh===null ?           
              <NavigationContainer>
                  <RegistrationContainer.Navigator>
                    <RegistrationContainer.Screen name='Login'>
                        {
                            ()=><Login setToken={setToken}/>
                        }
                    </RegistrationContainer.Screen>
                  </RegistrationContainer.Navigator>
              </NavigationContainer>
               
         : <View></View>
}
export default App









