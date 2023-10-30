import React,{Component, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
export const MyContext=React.createContext()
import { View,Text, Dimensions, } from 'react-native';
const {width,height}=Dimensions.get('window')


const Axios=(Comp)=>{
  
   const NewComponent=(props)=>{
    const [access,setAccess]=useState({access:'',user_id:null})
    const [refresh,setRefresh]=useState('')
    const [data,setData]=useState({content:[],loading:false})
    const [load,setLoad]=useState(false)

    useEffect(()=>{
       Gettokens()      
       if(refresh && !data.loading){
        GetData()
        
      }
      else if(load){
        GetData()
        
      }
     },[refresh,load])
     const Gettokens=async(acc=null,ref=null)=>{
      if(acc && ref){
         await AsyncStorage.setItem('access_token',acc)
         await AsyncStorage.setItem('refresh_token',ref)
      }
      else{
       
         
         let storage=await AsyncStorage.getItem('refresh_token')
         let user_id=JSON.parse(Base64.decode(storage.split('.')[1])).user_id
         
         setAccess({access:await AsyncStorage.getItem('access_token'),user_id:user_id})
         setRefresh(storage)  
       
      }
     
   }
   const GetData=()=>{
    const ax=axios.create({
      baseURL:'http://192.168.43.58:8000/',
      headers:{
       Authorization:access.access ? 'Bearer ' + access.access : null
      }     
    })
    ax.interceptors.response.use(res=>res,
      async error=>{
        let oreq=error.config
        if(error.response.status===401 && error.response.data.code==='token_not_valid'){
           if(refresh){
             
              let parts=JSON.parse(Base64.decode(refresh.split('.')[1]))
              let expiry=parts.exp
              let now=Math.ceil(Date.now()/1000)
              
              if(expiry>now){
                try {
                  const res = await ax.post('/refresh/', { refresh: refresh });
                  Gettokens(res.data.access, res.data.refresh);
                  ax.defaults.headers['Authorization'] = 'Bearer ' + res.data.acces;
                  oreq.headers['Authorization'] = 'Bearer ' + res.data.access;
                  return await ax(oreq);
                } catch (err) {
                  return err;
                }
                
              }
              else{
                alert('refresh token expired')
              }
           }
           else{
            alert('refresh token not available')
           }
        }
        else{
          alert('network problem')
        }
       return Promise.reject(error)        
})
   switch(props.method){
    case 'get':
    ax.get(props.url)
    .then(res=>setData({content:res.data,loading:true}))
     .catch(err=>err)
     break;
    default:
      console.log('defaul')
    } 
   }
  

     return <MyContext.Provider value={data}>
           <Comp 
              loading={data.loading}  load={load} setLoad={setLoad}
              user_id={access.user_id}
              {...props}
           />
    </MyContext.Provider>
     
     
  
   }
   return NewComponent
}
export default Axios


















































































