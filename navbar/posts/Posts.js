import axios from 'axios';
import React,{useState,useEffect,createContext} from 'react';
import {View,Text,FlatList,Image} from 'react-native';
import myaxios from '../myaxios';
import RenderPosts from './RenderPosts';
export const  Api=createContext()
function Posts(props){
  const [posts,setPosts]=useState([])
  const [paused_id,setPaused]=useState(false)
  useEffect(async()=>{
   const source=axios.CancelToken.source()
   try{
      const res=await(await myaxios()).get('/posts/',{cancelToken:source.token})
      setPosts(res.data)
   }
   catch(err){
    console.log('axios error from posts')
   }
   return ()=>{
    source.cancel()
   }
  },[])
  const viewabilityConfig={
    minimumViewTime:400,
    viewAreaCoveragePercentThreshold:50
  }
  const onViewableItemsChanged=React.useCallback(({viewableItems,changed})=>{
    setPaused(changed[0].item.id)  
},[])
  const viewabilityConfigCallbackPairs=React.useRef([{
    viewabilityConfig,onViewableItemsChanged
  }])

  return <View>
        <FlatList 
           ItemSeparatorComponent={()=><View style={{height:20}}></View>}
           data={posts}
           keyExtractor={item=>item.id}
           renderItem={({item})=><Api.Provider value={item}>
             <RenderPosts item_id={item.id} 
               paused={item.id===paused_id ? false : true }
               post_by={item.post_by}               
              {...props}/>
           </Api.Provider>}
           ListFooterComponent={()=><View style={{height:20}}></View>}
           viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
  </View>
}
export default React.memo(Posts)














