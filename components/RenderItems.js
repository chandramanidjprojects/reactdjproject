import React,{useEffect,useState} from 'react';
import {Text,View,Image,Pressable,Dimensions} from 'react-native';
import myaxios from './myaxios';
function RenderItems({item,user_id,setModal,subs}){
    const [remove,setRemove]=useState(false)
    const val=Dimensions.get('window').width
    const filter=item.current_users.filter(it=>it.id !== user_id)
    const Un_read=(item)=>{
        let count=0    
        item.messages.forEach((obj,index)=>{
           if(obj.unread){
              if(obj.message_to===user_id){
                count++
              }
    
           }
        })
        return count
      }
    const HandlePress=(item)=>{
      setModal({visible:true,id:item.id})
      subs(item.id,true)
    }  
    const HandleFollow=async(item)=>{
        setRemove(true)
        const res=await(await myaxios()).post('/friends/',{
          notifier_id:user_id,
          add_user:item.id
        })
    }
    return filter.map(it=>{
      console.log('render items....')
       return <View  style={{flexDirection:'row',justifyContent:'space-between'}} key={it.id}>
        <Pressable
          onPress={()=>HandlePress(item)}
         >{
           !remove ? 
           <View  style={{flexDirection:'row',justifyContent:'space-between',width:val*0.8}}>
        <Image source={{uri: `http://192.168.43.58:8000${it.profile}/`}} style={{width:50,height:50}}/>
        <Text>{it.id} {it.username}</Text>        
        <Text>{it.active_state ? 'online' : null}</Text>
        <Text>unread {Un_read(item)}</Text>      

    </View>
           :null
         } 
         {
          
         }
    </Pressable>
     <Text onPress={()=>HandleFollow(it)}>remove</Text>
    </View>
    })  
      
   
}
export default React.memo(RenderItems)