import React,{Component, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';

async function myaxios(){
  const settokens=async(access,refresh)=>{
     await AsyncStorage.setItem('access_token',access)
     await AsyncStorage.setItem('refresh_token',refresh)
  }

  let refresh=await AsyncStorage.getItem('refresh_token') 
  const ax=axios.create({
    baseURL:'http://192.168.43.58:8000/',
    headers:{
     Authorization:await AsyncStorage.getItem('access_token') ? 'Bearer ' + await AsyncStorage.getItem('access_token') : null
    }                     
   })
   ax.interceptors.response.use(res=>{
  
    return res
   },
     async error=>{
        let oreq=error.config
      if(error.response.status===401 && error.response.data.code==='token_not_valid'){
         
         if(refresh){
          let parts=JSON.parse(Base64.decode(refresh.split('.')[1]))
          let now=Math.ceil(Date.now()/1000)
          if(parts.exp > now){
            const res = await axios.post('http://192.168.43.58:8000/refresh/', { refresh: refresh });
            settokens(res.data.access, res.data.refresh);
            ax.defaults.headers['Authorization'] = 'Bearer ' + res.data.access;
            oreq.headers['Authorization'] = 'Bearer ' + res.data.access;
            return await ax(oreq);

          }else{console.log('refresh token expired')}
         }else{console.log('refresh token not available...')}
      } 
      else{console.log('something went wrong...........')}        
      return Promise.reject(error)
    }   
   )
   
 return ax
}
export default myaxios
  //  ax.get('/posts/')
  //  .then(res=>console.log('res in get',res))
  //  .catch(err=>console.log('err in catch',err))



// const Myaxios=async()=>{
//     const refresh=await AsyncStorage.getItem('refresh_token')
//     const ax=axios.create({
//         baseURL:'http://192.168.43.58:8000/',
//         headers:{
//          Authorization:await AsyncStorage.getItem('access_token') ? 'Bearer ' + await AsyncStorage.getItem('access_token') : null
//         }                 
//     })
//     ax.interceptors.response.use(res=>{
       
//        return res
//     },
//         async error=>{
//           let oreq=error.config
//           if(error.response.status===401 && error.response.data.code==='token_not_valid'){
//              if(refresh){
               
//                 let parts=JSON.parse(Base64.decode(refresh.split('.')[1]))
//                 let expiry=parts.exp
//                 let now=Math.ceil(Date.now()/1000)
                
//                 if(expiry>now){
//                   try {
//                     const res = await axios.post('/refresh/', { refresh: refresh });
//                     await AsyncStorage.setItem('access_token',res.data.access)
//                     await AsyncStorage.setItem('refresh_token',res.data.redresh)
//                     ax.defaults.headers['Authorization'] = 'Bearer ' + res.data.acces;
//                     oreq.headers['Authorization'] = 'Bearer ' + res.data.access;
//                     return await ax(oreq);
//                   } catch (err) {
//                     return err;
//                   }
                  
//                 }
//                 else{
//                   alert('refresh token expired')
//                 }
//              }
//              else{
//               alert('refresh token not available')
//              }
//           }
//           else{
//              console.log('network problem')
//             //alert('network problem')
//           }
//          return Promise.reject(error)        
//   })
//   return ax
// }
// export default Myaxios