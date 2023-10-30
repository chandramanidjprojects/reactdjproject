import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {Button,View,Text} from 'react-native';
const request_id=new Date().getTime()
class Room extends React.Component{
  componentDidMount(){
     this.socket=new WebSocket(`ws://192.168.43.58:8000/ws/chats/?token=${this.props.access}`)
     this.socket.onopen=()=>{
      this.socket.send(JSON.stringify({
        action:'list',
        request_id:request_id
      }))
    }
    this.socket.onmessage=(e)=>{
      const data=JSON.parse(e.data)
      switch(data.action){
         case 'list':
          this.data=data.data
          this.count(this.data)
          break;
        case 'update':
          const data1=data.data
          if(data1.notifier_id !== this.props.user_id){
              
              this.data.forEach((item,index)=>{
                  
                if(item.id === data1.id){
                                       
                  this.data[index]=data1
                  }
                })
              this.count(this.data)         
            }
             break;
            default:break;

      }
    }
  }

  count=(room)=>{
    let mcount=0
    for(let i=0;i<room.length;i++){
      this.subscribe_to_room(room[i].id)
      let messages=room[i].messages
      for(let j=messages.length-1;j>=0;j--){
        if(messages[j].message_to===this.props.user_id ){
          if(messages[j].unread){
            mcount=mcount+1;
            break;
          }
       }
      }                
    }
  this.props.setCount(mcount)
 }  
 subscribe_to_room=(room_id)=>{
   this.socket.send(JSON.stringify({
    action:'subscribe_instance',
    pk:room_id,
    request_id:request_id
   }))
 }
  render(){
    return <></>
  }
}
export default Room

















// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Base64 } from 'js-base64';
// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import {View,Text} from 'react-native';

// let render=true
// let request_id=new Date().getTime()
// function Room(props){
//   const [count,setCount]=useState(0)
//   const [access,setAccess]=useState({acc:null,user_id:null})
//   useEffect(async()=>{
//      let access=await AsyncStorage.getItem('access_token')
//      let user_id=JSON.parse(Base64.decode(access.split('.')[1])).user_id
//      setAccess({acc:access,user_id:user_id})
//   },[])
//   if(render && access.acc){
//     let socket=new WebSocket(`ws://192.168.43.58:8000/ws/chats/?token=${access.acc}`)
//     socket.onopen=()=>{
//       socket.send(JSON.stringify({
//         action:'list',
//         request_id:request_id
//       }))
//     }
//     socket.onmessage=(e)=>{
//       const data=JSON.parse(e.data)
//       switch(data.action){
//         case 'list':
//          let c=Count(data.data)
//           //console.log(c) 
//            setCount(c)
//            break;

//       }      
//     }
//     render=false
//   }
//   const Count=(room)=>{
//      let mcount=0
//      for(let i=0;i<room.length;i++){
//        let messages=room[i].messages
//        for(let j=messages.length-1;j>=0;j--){
//          if(messages[j].message_to===access.user_id ){
//            if(messages[j].unread){
//             //console.log('count',messages[j].message_to===access.user_id)
//              mcount=mcount+1;
//              break;
//            }
//         }
//        }                
//      }
//     return mcount
//   }  
//     return <View>
//        {console.log(count)}       
//         <Text>Chat {count}</Text>
//     </View>
// }


// export default React.memo(Room)








