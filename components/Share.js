import {View,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
import React,{ useEffect, useState } from 'react';
import myaxios from './myaxios';
import  Icon  from 'react-native-vector-icons/Ionicons';
const Share=()=>{
    return <View>
       <Text>share <Icon name='share-social' size={20}/></Text>
    </View>
 }
 export default Share