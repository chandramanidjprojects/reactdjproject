import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image,Modal,Pressable,Dimensions,StatusBar} from 'react-native';
import axios from 'axios';
import myaxios from '../components/myaxios';
import  Icon  from 'react-native-vector-icons/Ionicons';
import RenderEveryStatus from './RenderEveryStatus';
import Prof from './Prof';
const height=Dimensions.get('window').height-30

function StatusPosts(props){
    const ref=React.useRef(null)
    const [visible,setVisible]=useState(true)
    const [status,setStatus]=useState([])
    const [paus,setPaus]=useState(null)
    const [value,setValue]=useState('')
    
    useEffect(()=>{
      const source=axios.CancelToken.source()
      const get_data=async()=>{
         try{
           const res=await(await myaxios()).get('/users/'+props.route.params.id+'/',{cancelToken:source.token})
           len=res.data.status_order.length;
           setStatus(res.data);
        }
         catch(error){

         }
      }
      get_data()
     return ()=>{
        source.cancel()
     }
    },[props.route.params?.id])
  const viewabilityConfig={
   minimumViewTime:400,
   viewAreaCoveragePercentThreshold:10
  }
  const onViewableItemsChanged=React.useCallback(({viewableItems,changed})=>{
        if(changed[0].isViewable){
          setPaus(changed[0].item.id)
          ref.current.scrollToIndex({index:changed[0].index})           
        }        
  },[])
  const _onViewabilityConfigCallbackPair=React.useRef([{
    viewabilityConfig,onViewableItemsChanged
  }])
  const _onScrollToIndexFailed=(error)=>{
    const offset=error.averageItemLength * error.index
    ref.current.scrollToOffset({offset})
    ref.current.scrollToIndex({index:error.index})
  }
  return <Modal visible={visible} onRequestClose={()=>{
   setVisible(false)
   props.navigation.navigate('status1')       
      }
   } animationType='fade'> 
   <Text onPress={()=>{
       setVisible(false)
       props.navigation.navigate('status1')
       }}><Icon name='arrow-back' size={30}/>{props.route.params.id}
   </Text>
   
  <View 
   
  >
  <FlatList 
    ref={ref}    
    viewabilityConfigCallbackPairs={_onViewabilityConfigCallbackPair.current}
    data={status.status_order}
    keyExtractor={item=>item.id}
    ListHeaderComponent={()=><View>
      { 
         props.route.params.profile ?
          <>
          <Image source={{uri:status.profile}} style={{height:height}}/> 
          <HandleActivities user_id={props.user_id} status={status}/>
          </>
          : null
        
          
        
      }
    </View>
    }
    onScrollToIndexFailed={_onScrollToIndexFailed}
    renderItem={({item})=><RenderEveryStatus item={item} 
     paused={item.id===paus ? false : true}     
    {...props}/>}
    ListFooterComponent={()=><View >
      
      {
         !props.route.params.profile ?
         <>
          <Image source={{uri:status.profile}} style={{height,resizeMode:'stretch'}}  /> 
          <HandleActivities user_id={props.user_id} status={status}/>
         </>
          : null
           
      }
    </View>}
  />
</View>
</Modal>

}
export default StatusPosts


const HandleActivities=({user_id,status,navigation})=>{
   const ref=React.useRef(null)
   const [mvisible,setmVisible]=useState(false)
   return <View style={{position:'relative',bottom:300}}>
      {
         status.likes ?
         status.likes.includes(user_id) ?
         <Text 
         style={{color:'green',backgroundColor:'white',position:'absolute',top:140,left:5}}
         >likes {status.likes.length}</Text>
         :
         <Text
         style={{backgroundColor:'white',position:'absolute',top:160,left:5}}
         >likes  {status.likes.length} </Text>
         :
         null
      }

   <Text onPress={()=>setmVisible(!mvisible)}
      style={{backgroundColor:'white',position:'absolute',top:120,left:5}}
   >comments</Text>
    {
      mvisible ? <Prof id={status.id} user_id={user_id} setmVisible={setmVisible}/> : null
    }

   <Text style={{backgroundColor:'white',position:'absolute',top:80,left:5}}>share</Text>
 </View>
}









