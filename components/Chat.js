import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Base64 } from 'js-base64';
import React,{Component, useEffect, useState} from 'react';
import {View,Text,Image, FlatList, Modal} from 'react-native';
import  Icon from 'react-native-vector-icons/Ionicons';
import myaxios from './myaxios';
import RenderUsers from './RenderUsers';
class Chats extends React.PureComponent{
   constructor(props){
      super(props)
      this.state={
         users:[],
         access:null
      }
      this.user_id=null
   }
  
  componentDidMount(){
   
    const get_access=async()=>{
  

       const access=await AsyncStorage.getItem('access_token')
       this.user_id=JSON.parse(Base64.decode(access.split('.')[1])).user_id       
       //console.log(access)
       if(!this.mounted){
         this.setState({access:access})
       }

    } 
    get_access() 
  } 
  componentWillUnmount(){
   this.mounted=true
  }
  render(){
   
   return <View>
      {
         this.state.access ? <RenderUsers access={this.state.access} user_id={this.user_id}
            {...this.props}
          /> :null
      }
   </View>
  }
}
export default React.memo(Chats)




























// import RenderChats from './RenderChats';
// import RenderUsers from './RenderUsers';
// function Chat(props){
//   const [users,setUsers]=useState([])
//   const [modal,setModal]=useState({visible:false,id:null,profile:null})
//   const [user,setUser]=useState({uid:null,refresh:null})
//   useEffect(()=>{
//      const getInfo=async()=>{
//           const ref=await AsyncStorage.getItem('refresh_token')
//           const ref_user_id=JSON.parse(Base64.decode(ref.split('.')[1])).user_id
//           setUser({uid:ref_user_id,refresh:ref})
//      }
//      getInfo()
//   },[])
//   useEffect(()=>{
//      const source=axios.CancelToken.source()
//      const loadusers=async()=>{
//         const res=await(await myaxios()).get('/users/',{
//            cancelToken:source.token
//         })
        
//         setUsers(res.data)
//      }
//      loadusers()
//      return ()=>{
//         source.cancel()
//      }
//   },[])

//   return <View style={{margin:10}}>
//         <FlatList 
//           data={users}
//           renderItem={({item})=><RenderUsers item={item} setModal={setModal}/>}
//         />
//         <Modal
//            animationType='slide'
//            visible={modal.visible}
//            onRequestClose={()=>{
//              setModal({visible:false,id:null,profile:null})
//            }}
//         >
//           <View style={{flex:1}}>
//             <RenderChats id={modal.id} profile={modal.profile}
//                user={user}
//             />
//           </View>
//         </Modal>
// </View>
// }
// export default React.memo(Chat)







