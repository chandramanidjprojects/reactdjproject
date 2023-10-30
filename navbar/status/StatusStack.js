import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import RecentStatus from './RecentStatus';

function StatusStack(props){
    const Stack=createNativeStackNavigator()
    return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='RecentStatus'>
        {
            (props)=><RecentStatus />
        }
        </Stack.Screen>
    </Stack.Navigator>
}

export default StatusStack