import {View,Text} from 'react-native';
import React from 'react';
import  Icon  from 'react-native-vector-icons/Ionicons';
const Comments=(props)=>{
   
    return <View>
       <Text onPress={
        ()=>{props.setModalVisible({visible:true,id:props.item.id})

            props.setPaused(null)
       }
    }
       
       >comments <Icon name='chatbubble-ellipses-outline' size={20}/></Text>
    </View>
 }

 export default React.memo(Comments)