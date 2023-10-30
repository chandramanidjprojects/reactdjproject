import {Dimensions,View,Text, FlatList, Image, TextInput, KeyboardAvoidingView,AppState,
  TouchableWithoutFeedback,Keyboard, Pressable,Modal
  } from 'react-native';
import React,{ useEffect, useRef, useState } from 'react';
import RenderItems from './RenderItems';
import LiveChat from './LiveChat';
function RenderUsers(props){
  let unmounted;
  let closed=false
  const [request_id,_]=useState(new Date().getTime())
  const [modal,setModal]=useState({visible:false,id:null})
  const [users,setUsers]=useState({data:[],completed:false})  
  const socket=React.useMemo(()=>{
     return new WebSocket(`ws://192.168.43.58:8000/ws/chats/?token=${props.access}`)
  },[])

  useEffect(()=>{
    if(users.completed){
      socket.send(JSON.stringify({
        action:'notify',
        request_id:request_id,        
      }))
    }
     socket.onopen=()=>{
      socket.send(JSON.stringify({
        action:'list',
        request_id:request_id,
        
      }))      
     }
     socket.onmessage=(e)=>{
        const data=JSON.parse(e.data)
        
        switch(data.action){
          case 'list':
            Chat_notification(data.data)
            if(!users.completed){
              data.data.forEach((item,index)=>{
                Subscribe_to_room(item.id)

            })
            }

            
           if(!unmounted){
            setUsers({data:data.data,completed:true})
           }

            break;  
          case 'update':
            console.log('update from render users')
            const data1=data.data
            if(data1.notifier_id !== props.user_id){
                let state_users=users.data
                state_users.forEach((item,index)=>{
                  
                  if(item.id === data1.id){
                                       
                    state_users[index]=data1
                   
                  }
                  Chat_notification(state_users)
                })
                if(!unmounted){
                  setUsers({data:state_users,completed:users.completed})
                 }
            }
             break;
            default:break;
        }
     }
     //bellow code for component unmount
     return ()=>{
      unmounted=true
     }
  },[users.completed])
  const Subscribe_to_room=(room_id)=>{
    socket.send(JSON.stringify({
      action:'subscribe_instance',
      pk:room_id,
      request_id:request_id
    }))
  }
  const Chat_notification=(rooms)=>{
   let count=0
   for(let i=0;i<rooms.length;i++){
     let messages=rooms[i].messages
     for(let j=messages.length-1;j>=0;j--){
      if(messages[j].unread){
        if(messages[j].message_to === props.user_id){
          count=count+1
          break;
        }
      }
   }
  }
  props.update(count)
  }
  
  const Subs=React.useCallback((room_id,status)=>{
    if(!status){
      socket.send(JSON.stringify({
        action:'list',
        request_id:request_id,
        
      }))
    }
  //  else{
  //   socket.send(JSON.stringify({
  //     action:'subscribe_instance',
  //     pk:room_id,
  //     request_id:request_id      
  //   }))
  //  } 

  },[])
  return <View>
    <FlatList 
      data={users.data}
      keyExtractor={(item)=>item.id}
      renderItem={({item})=><RenderItems item={item} key={item.id} 
         user_id={props.user_id}
         setModal={setModal}
         subs={Subs}
      />}
    />
    
    <Modal
      animationType='fade'
      visible={modal.visible}
    >

     <LiveChat id={modal.id} access={props.access} 
       setModal={setModal}
       subs={Subs}
       user_id={props.user_id}
     />
    </Modal>
  </View>
}
export default RenderUsers













// class RenderUsers extends React.Component{
//   constructor(props){
//       super(props)
//       this.state={
//         users:[]
//       }
//       this.socket=new WebSocket(`ws://192.168.43.58:8000/ws/chats/?token=${this.props.access}`)
//       this.updated_data=[]
//       this.new_messages=[]
//       this.intialupdate=true
//   }
//   componentWillUnmount(){
//     this.unmounted=true
    
//   }
//   componentDidUpdate(){
//     if(this.intialupdate){
//       this.intialupdate=false
//       this.socket.send(JSON.stringify({
//         action:'notify',
//         request_id:new Date().getTime(),        
//       }))
//     }
//   }
//   componentDidMount(){  
    
//     this.subscribe=AppState.addEventListener('change',nextAppState=>{
//       if(nextAppState==='active'){
//         this.socket.send(JSON.stringify({
//           action:'notify',
//           hint:'active',
//           request_id:new Date().getTime(),
          
//         }))
//       }
//        if(nextAppState==='background'){
//          //this.socket.close()
         
//         //   this.socket.send(JSON.stringify({
//       //     action:'notify',
//       //     hint:'background',
//       //     request_id:new Date().getTime(),
          
//       //   }))
//        }
//     })    

//     this.socket.onopen=()=>{
      
//       this.socket.send(JSON.stringify({
//         action:'list',
//         request_id:new Date().getTime(),
        
//       }))
      

//     }
//    this.socket.onmessage=(e)=>{
//     const data=JSON.parse(e.data)
    
//     switch(data.action){
//       case 'list':
//         data.data.forEach((item,index)=>{
//           this.subscribe_to_room(item.id)
//         })
//         if(!this.unmounted){
//           this.setState({users:data.data});
//         }
        

//         break;
//       case 'update':
        
//         let data1=data.data
//         if(data1.notifier_id !== this.props.user_id){
//           console.log('update......')
//           let users=this.state.users
//           users.forEach((item,index)=>{
//             if(data1.id===item.id){
              
//               users[index]=data1
//             }
//           })
//           if(!this.unmounted){
//             this.setState({users:[...users]})
//           }
//         }

//         break;

//       default:
//           break 
//     }


//    } 
//   }
//   subscribe_to_room=(room_id)=>{
//       this.socket.send(JSON.stringify({
//         action:'subscribe_instance',
//         request_id:new Date().getTime(),
//         pk:room_id
//       }))
//   }

//   un_read=(item)=>{
//     let count=0    
//     item.messages.forEach((obj,index)=>{
//        if(obj.unread){
//           if(obj.message_to===this.props.user_id){
//             count++
//           }

//        }
//     })
//     return count
//   }

//   render(){
//     //console.log('from render users........',this.intialupdate)
//     return <View>
//       <FlatList 
//         data={this.state.users}
//         keyExtractor={(item)=>item.id}
//         renderItem={({item})=><View>
//           {
//             item.current_users.map((it)=>{
//               if(it.id !== this.props.user_id){
//                 return <View key={it.id} style={{flexDirection:'row',justifyContent:'space-between'}}>
//                     <Image source={{uri: `http://192.168.43.58:8000${it.profile}/`}} style={{width:50,height:50}}/>
//                     <Text>{it.id} {it.username}</Text>        
//                     <Text>{it.active_state ? 'online' : null}</Text>
//                     <Text>unread {this.un_read(item)}</Text>      

//                 </View> 
//               }

//             })

//           }
//         </View>}
//       />


//     </View>
//   }

// }
// export default RenderUsers








































