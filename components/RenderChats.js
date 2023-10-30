import {Dimensions,View,Text, FlatList, Image, TextInput, KeyboardAvoidingView,
    TouchableWithoutFeedback,Keyboard, Pressable,AppState
    } from 'react-native';
import React,{ useEffect, useRef, useState } from 'react';
import axios from 'axios';
import myaxios from './myaxios';

class RenderChats extends React.PureComponent{
  constructor(props){
    super(props)
    this.state={
      
      chats:[],
      text:'',
      id:props.id,
      appState:AppState.currentState      
    }
    this.source=axios.CancelToken.source(),
    this.socket=new WebSocket(`ws://192.168.43.58:8000/ws/chats/${this.props.id}/?token=${props.user.refresh}`)
  }
componentDidMount(){

  this.socket.onmessage=(e)=>{
    console.log(JSON.parse(e.data))
    this.setState({chats:[...this.state.chats,JSON.parse(e.data)]})
  }
  const getchats=async()=>{
     try{
        const res=await(await myaxios()).get(`/chats/${this.props.id}/`,{
          cancelToken:this.source.token
        })
      
        this.setState({chats:res.data})
     }
     catch(err){
       console.log('for chats axios req canceled')
     }
  }
  getchats()     
}
componentWillUnmount(){
  console.log('un mounted')
  this.source.cancel()
  this.appStateSubscription.remove()
}
sendChat=()=>{
  this.socket.send(JSON.stringify({chat_text:this.state.text}))
  this.setState({text:''})
}

  render(){
    
    return <KeyboardAvoidingView bahavior='height' style={{flex:1,margin:10}}>
    <View style={{flex:1}}>
      <Image source={{uri:this.props.profile}} style={{width:60,height:60,borderRadius:30}}/>
      <FlatList 
        data={this.state.chats}
        renderItem={({item})=><View>
        {
          item.chat_to===this.state.id ? 
          <View style={{backgroundColor:'skyblue',marginTop:5,
          marginLeft:150,borderRadius:10,
          opacity:0.7,display:'flex',flexDirection:'row'
          }}>
          <Text style={{width:'auto'}}>{item.chat_text}</Text>
        </View> :
        <View style={{backgroundColor:'skyblue',marginTop:5,marginRight:150,
        borderRadius:10,opacity:0.7,
        display:'flex',flexDirection:'row'
        }}>
        <Text>{item.chat_text}</Text>
      </View>  
        }

        </View>}
      />        
    </View>
    <View style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'red'}}>
      <TextInput style={{flex:1}}
        placeholder='chat here'
        multiline={true}
        value={this.state.text}
        onChangeText={(text)=>this.setState({text})}
      />
      {
      this.state.text ?
       <Pressable style={{marginTop:10}}
         onPress={()=>this.sendChat()}
       >
        <Text>send</Text>
       </Pressable> : null
      }

    </View>
</KeyboardAvoidingView>
  }
}
export default RenderChats







// import axios from 'axios';
// import myaxios from './myaxios';

// function RenderChats({id,profile,user:{uid,refresh}}){
  
//   const [chats,setChats]=useState([])
//   const [text,setText]=useState('')

//   useEffect(()=>{
//       const source=axios.CancelToken.source()
//       const getchats=async()=>{
//          try{
//             const res=await(await myaxios()).get(`/chats/${id}/`)
//             console.log(res.data)
//             setChats(res.data)
//          }
//          catch(err){

//          }
//       }
//       getchats()
//       socket.onmessage=(e)=>{
//         console.log(e.data)
//         setChats([...chats,JSON.parse(e.data)])
//       } 
//       return ()=>{
//         source.cancel()
//       }
//   },[id])
//   useEffect(()=>{

//   },[])
//   const socket=React.useMemo(()=>{
//     return new WebSocket(`ws://192.168.43.58:8000/ws/chats/${id}/?token=${refresh}`)
//   },[])

    
//   const SendChat=()=>{
//           socket.send(JSON.stringify({chat_text:text}))
//   }
//   return <KeyboardAvoidingView bahavior='height' style={{flex:1,margin:10}}>
//       <View style={{flex:1}}>
//         <Image source={{uri:profile}} style={{width:60,height:60,borderRadius:30}}/>
//         <FlatList 
//           data={chats}
//           renderItem={({item})=><View>
//           {
//             item.chat_to===id ? 
//             <View style={{backgroundColor:'skyblue',marginTop:5,marginLeft:150,borderRadius:10,opacity:0.7}}>
//             <Text style={{}}>{item.chat_text}</Text>
//           </View> :
//           <View style={{backgroundColor:'skyblue',marginTop:5,marginRight:150,borderRadius:10,opacity:0.7}}>
//           <Text>{item.chat_text}</Text>
//         </View>  
//           }

//           </View>}
//         />        
//       </View>
//       <View style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'red'}}>
//         <TextInput style={{flex:1}}
//           placeholder='chat here'
//           multiline={true}
//           value={text}
//           onChangeText={(text)=>setText(text)}
//         />
//         {
//         text ?
//          <Pressable style={{marginTop:10}}
//            onPress={()=>SendChat()}
//          >
//           <Text>send</Text>
//          </Pressable> : null
//         }

//       </View>
//   </KeyboardAvoidingView>
// }
// export default React.memo(RenderChats)



