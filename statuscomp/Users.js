import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Modal,Pressable,TextInput} from 'react-native';
import myaxios from '../components/myaxios';
import RenderStatus from './RenderStatus';
import axios from 'axios';

function Users(props){
  const ref=React.useRef(null)
  const [users,setUsers]=useState([])   
  const [paused_id,setPaused]=useState(null)
  const source=axios.CancelToken.source()   
  useEffect(async()=>{
     try{
         const res=await(await myaxios()).get('/users/',{cancelToken:source.token})
         
         setUsers(res.data)
     }
     catch(error){
         console.log('request cancelled from status users')
     }
 
    return ()=>{
     source.cancel()
    }
  },[])
 
  const viewabilityConfig={
   minimunViewTime:400,
   viewAreaCoveragePercentThreshold:50
  }
  const onViewableItemsChanged=React.useCallback(({viewableItems,changed})=>{
    setPaused(changed[0].item.id)
    
  },[])
  const _viewabilityConfigCallbackPairs=React.useRef([{
   viewabilityConfig,onViewableItemsChanged
  }]) 
    return <View>
     <FlatList 
       ref={ref}
       data={users}
       keyExtractor={item=>item.id}
       renderItem={({item})=><>
         {
                  item.follow.includes(props.user_id) ?
                  <RenderStatus  {...props} key={item.id}
                     item={item}
                     paused={item.id===paused_id ? paused_id : null}
                     setPaused={setPaused}

                  /> :null
         }
         
       </>}
       viewabilityConfigCallbackPairs={_viewabilityConfigCallbackPairs.current}
     />
     <View>

     </View>
    </View> 
}
export default Users







