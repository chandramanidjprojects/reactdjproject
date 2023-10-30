// import React,{Component, useEffect, useState} from 'react';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Base64 } from 'js-base64';
// export const MyContext=React.createContext()
// import { View,Text, Dimensions, } from 'react-native';
// const {width,height}=Dimensions.get('window')


// const Axios=(Comp)=>{
//     const NewComponent=()=>{
      
//       const [token,setToken]=useState({access:null,refresh:null})
//       const [isMounted,setIsMounted]=useState(true)
//       useEffect(()=>{
//         if(isMounted){
//             Gettokens()
//         }
//         return ()=>{
//           setIsMounted(false)
//         }

//       },[])
//       const Gettokens=async(acc=null,ref=null)=>{
//         if(acc && ref){
//             await AsyncStorage.setItem('access_token',acc)
//             await AsyncStorage.setItem('refresh_token',ref)
//          }
//          else{
//           let access=await AsyncStorage.getItem('access_token')       
//           let refresh=await AsyncStorage.getItem('refresh_token')  
//           setToken({access:access,refresh:refresh})  
          
//          }
//       }
//         const ax=axios.create({
//             baseURL:'http://192.168.43.58:8000/',
//             headers:{
//              Authorization:token.access ? 'Bearer ' + token.access : null
//             }                 
//         })
//         ax.interceptors.response.use(res=>{
           
//            return res
//         },
//             async error=>{
//               let oreq=error.config
//               if(error.response.status===401 && error.response.data.code==='token_not_valid'){
//                  if(token.refresh){
                   
//                     let parts=JSON.parse(Base64.decode(token.refresh.split('.')[1]))
//                     let expiry=parts.exp
//                     let now=Math.ceil(Date.now()/1000)
                    
//                     if(expiry>now){
//                       try {
//                         const res = await ax.post('/refresh/', { refresh: token.refresh });
//                         Gettokens(res.data.access, res.data.refresh);
//                         ax.defaults.headers['Authorization'] = 'Bearer ' + res.data.acces;
//                         oreq.headers['Authorization'] = 'Bearer ' + res.data.access;
//                         return await ax(oreq);
//                       } catch (err) {
//                         return err;
//                       }
                      
//                     }
//                     else{
//                       alert('refresh token expired')
//                     }
//                  }
//                  else{
//                   alert('refresh token not available')
//                  }
//               }
//               else{
//                  console.log('network problem')
//                 //alert('network problem')
//               }
//              return Promise.reject(error)        
//       })
      
//       return <Comp ax={ax}/>
//     }
//     return NewComponent
// }
// export default Axios

