import React from 'react';
import {View,Text,FlatList, TextInput} from 'react-native';

class LiveChat extends React.Component{
  constructor(props){
    super(props);
    this.state={
      chats:[],
      value:''
    }
    this.request_id=new Date().getTime()
    this.socket=new WebSocket(`ws://192.168.43.58:8000/ws/chats/?token=${this.props.access}`)
  }
  componentDidMount(){
    this.socket.onopen=()=>{
      this.socket.send(JSON.stringify({
        action:'notify',
        hint:'user_subscription',
        room_id:this.props.id,
        request_id:this.request_id
      }))

      this.socket.send(JSON.stringify({
        action:'retrieve',
        pk:this.props.id,
        request_id:this.request_id
      }))
      this.socket.send(JSON.stringify({
        action:'subscribe_to_message',
        pk:this.props.id,
        request_id:this.request_id
      }))
      
    }
    this.socket.onmessage=(e)=>{
      const data=JSON.parse(e.data)
      switch(data.action){
        case 'retrieve':
          this.setState({chats:data.data.messages})
          break;
        case 'create':
          this.setState({chats:[...this.state.chats,data.data]})
          break;
        default:break;  
      }
    }
  }
  closesocket=()=>{
    this.socket.close()
    this.props.subs(this.props.id,false)
    this.props.setModal({visible:false,id:this.props.id})
  }
  sendChat=()=>{
    this.socket.send(JSON.stringify({
      action:'create_message',
      room_id:this.props.id,
      text:this.state.value,
      request_id:this.request_id
    }))
  }
  render(){
    return <View  style={{flex:1}}>
    
    <Text onPress={()=>this.closesocket()}>close</Text>
    <Text>live chats {this.props.id}</Text>
    <FlatList 
      data={this.state.chats}
      keyExtractor={(item)=>item.id}
      renderItem={({item})=><View>
        {
            item.message_by===this.props.user_id ?
              <View style={{marginLeft:150}}>
                <Text>{item.text} {item.id}</Text>
              </View> :
              <View >
                <Text>{item.text} {item.id}</Text>
              </View> 
        }              
      </View>}
    />
    <View>
      <TextInput 
         placeholder='write your chats here......'
         value={this.state.value}
         onChangeText={(value)=>this.setState({value:value})}
      />
    </View>
    <Text onPress={()=>this.sendChat()}>send</Text>
  </View>
  }
}
export default LiveChat













