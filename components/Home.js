import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { ActivityIndicator,View,Text, Button, FlatList, Modal, KeyboardAvoidingView,
TextInput,
Pressable
} from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import myaxios from './myaxios';
import RenderHomeComponents from './RenderHomeComponents';
import RenderComments from './RenderComments';
function Home(props){
  const [posts,setPosts]=useState({data:[],loading:true})
  const [paused,setPaused]=useState(null)
  const [modalVisible,setModalVisible]=useState({visible:false,id:null})
  const ref=React.useRef(null)
  useEffect(()=>{
    const source=axios.CancelToken.source()
    const loading=async()=>{
      try{
        const res=await(await myaxios()).get('/posts/',{cancelToken:source.token})
        setPosts({data:res.data,loading:false})
        ref.current.scrollToIndex({index:0})
      }
      catch(error){
        console.log('request got rejected')
      }
    }
    loading()
    
    return ()=>{
      console.log('component un mounted')
      source.cancel()
    }
  },[])
  const viewabilityConfig={
    
    minimumViewTime:400,
    viewAreaCoveragePercentThreshold:50
  }

  const onViewableItemsChanged=React.useCallback(({viewableItems,changed})=>{
    
    if(changed[1]){
         console.log('from viewability config..',changed[1].isViewable)
    }
    setPaused(changed[0].item.id)
  },[paused])
  const viewabilityConfigCallbackPairs=React.useRef([{
    viewabilityConfig,onViewableItemsChanged
  }])
  const OnScrollToIndexFailed=(error)=>{
    const offset=error.averageItemLength * error.index
    ref.current.scrollToOffset({offset})
    setTimeout(()=>ref.current.scrollToIndex({index:error.index}),500)
  }
  return <View>
    { posts.loading ? <ActivityIndicator 
        animating={posts.loading}
        color='blue'
      /> : null }
      <FlatList 
        ref={ref}
        data={posts.data}
        ItemSeparatorComponent={()=><View style={{height:30,backgroundColor:'rgba(120,100,100,0.2)',margin:5}}></View>}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=><RenderHomeComponents
          paused={paused===item.id ? paused : null} item={item} key={item.id}
          setModalVisible={setModalVisible} setPaused={setPaused}
          {...props}
          />}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onScrollToIndexFailed={OnScrollToIndexFailed}
        
      />
     <Modal animationType='slide'
            visible={modalVisible.visible}
            onRequestClose={()=>{
              setModalVisible({visible:false,id:null})
              setPaused(modalVisible.id)
            }}
     >
      <Pressable onPress={()=>{
              setModalVisible({visible:false,id:null})
              setPaused(modalVisible.id)
      }}>
         <Text><Icon name='arrow-back' size={30} color='blue'/></Text>
      </Pressable>
       
       <RenderComments id={modalVisible.id}/>
      </Modal>      
  </View>
}
export default Home




