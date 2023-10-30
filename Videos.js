import { useFocusEffect } from '@react-navigation/native';
import React,{useState} from 'react';
import {View,Text,FlatList,Image} from 'react-native';
import Axios, { MyContext } from './Axios';
import Video from 'react-native-video';

function Videos(){
  const [paused_id,setPaused_id]=useState(0)
  const RenderItems=({item})=>{
    return <View>
        <Video style={{height:500}}
          source={{uri:item.file}}
          resizeMode={'cover'}
          paused={paused_id===item.id ? false : true}
          
          controls={true}
  
        />
    </View>
  }
  const viewabilityConfig={
    viewAreaCoveragePercentThreshold:50,
    minimumViewTime:400,
    //waitForInteraction:true
  }
  const onViewableItemsChanged=({viewableItems,changed})=>{
    
    setPaused_id(changed[0].item.id)
  }
  const viewabilityConfigCallbackPairs=React.useRef([{
    viewabilityConfig,onViewableItemsChanged   
  }])
  return <MyContext.Consumer>
    { 
    
      ({content})=> <View>
          <FlatList 
             data={content}
             renderItem={({item})=><RenderItems item={item}/>}
             ItemSeparatorComponent={()=><View style={{height:20}}></View>}
             viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}            


          />
          
        </View>
      
    }
  </MyContext.Consumer>
}

export default Axios(Videos)