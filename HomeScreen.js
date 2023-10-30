// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React,{useLayoutEffect,Component,useEffect,useState} from 'react';
// import {Text,View,Button,FlatList,Image

// } from 'react-native';
// import { useFocusEffect,useScrollToTop } from '@react-navigation/native';
// import {Base64} from 'js-base64';
// import Video from 'react-native-video';
// import RenderHomeComponents from './RenderHomeComponents';


// function Home(){
//   const [access,setAccess]=useState(null)
//   const [refresh,setRefresh]=useState(null)
//   const [users,setUsers]=useState([])
//   const [paused_id,setPaused_id]=useState(null)
//   const ref=React.useRef(null)
//   useScrollToTop(ref)
//   useFocusEffect(
//     React.useCallback(
//       ()=>{
         
//       return ()=>{
        
        
//       }   
//     },[])
//   )
//   useEffect(()=>{
    
//     if(access===null && refresh===null){
//       Gettokens() //setAccess(),setRefresh()
//     }
    
//     else if(refresh){
      
//       GetUsers()
//     }
//     //  else{
//     //   GetUsers()
//     //  }
    
//   },[refresh])
//   const Gettokens=async(acc=null,ref=null)=>{
//     if(acc && ref){
//        await AsyncStorage.setItem('access_token',acc)
//        await AsyncStorage.setItem('refresh_token',ref)
//     }
//     else{
//       setAccess(await AsyncStorage.getItem('access_token'))
//       setRefresh(await AsyncStorage.getItem('refresh_token'))
//     }
    
//   }
//   const GetUsers=()=>{
    
//     let ax=axios.create({
//         baseURL:'http://192.168.43.58:8000/',
//         headers:{
//           Authorization:access ? 'Bearer  '+access : null
//         }
//       })
//     ax.interceptors.response.use(res=>res,
//       async error=>{
//         let oreq=error.config
//         if(error.response.status===401 && error.response.data.code==='token_not_valid'){
//            if(refresh){
             
//               let parts=JSON.parse(Base64.decode(refresh.split('.')[1]))
//               let expiry=parts.exp
//               let now=Math.ceil(Date.now()/1000)
              
//               if(expiry>now){
//                 try {
//                   const res = await ax.post('/refresh/', { refresh: refresh });
//                   Gettokens(res.data.access, res.data.refresh);
//                   ax.defaults.headers['Authorization'] = 'Bearer ' + res.data.acces;
//                   oreq.headers['Authorization'] = 'Bearer ' + res.data.access;
//                   return await ax(oreq);
//                 } catch (err) {
//                   return err;
//                 }
                
//               }
//               else{
//                 alert('refresh token expired')
//               }
//            }
//            else{
//             alert('refresh token not available')
//            }
//         }
//         else{
//           alert('network problem')
//         }
//        return Promise.reject(error)        
// })
//       ax.get('/posts/')
//       .then(res=>setUsers(res.data))
//       .catch(err=>err)
     
//   }


//   const viewabilityConfig={
    
//     minimumViewTime:2000,
//     viewAreaCoveragePercentThreshold:50
//   }
//   const onViewableItemsChanged=({changed})=>{
//     setPaused_id(changed[0].item.id)
//     console.log(changed)
//   }
//   const viewabilityConfigCallbackPairs=React.useRef([{
//     viewabilityConfig,onViewableItemsChanged
//   }])
//   const RenderComponents=({item})=>{
//     return <View style={{marginBottom:30}}>
          
//     <View style={{display:'flex',flexDirection:'row',backgroundColor:'skyblue',marginBottom:3}}>
//       <Image style={{width:60,height:60,borderRadius:30}} 
//         source={{uri:item.post_by.profile}}/>
//       <Text style={{marginTop:15,marginLeft:20}}>{item.post_by.email}</Text>
//     </View>
//     <Video style={{height:400}}
//      source={{uri:item.file+'/'}}
//      resizeMode='cover'
//      controls={true}
//      paused={paused_id===item.id ? false : true}
//      repeat={paused_id===item.id ? true : false}
     
//     />

// </View>
//   }
//   return <FlatList 
//           ref={ref}
//           data={users}
//           keyExtractor={item=>item.id}
//           renderItem={({item})=><RenderComponents item={item}/>}
//           viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}        
//         />
  
// }
// export default Home













