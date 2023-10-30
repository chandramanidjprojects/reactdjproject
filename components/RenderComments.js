import {Dimensions,View,Text, FlatList, Image, TextInput, KeyboardAvoidingView,
TouchableWithoutFeedback,Keyboard, Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
import React,{ useEffect, useRef, useState } from 'react';
import myaxios from './myaxios';
import axios from 'axios';
import  Icon  from 'react-native-vector-icons/Ionicons';


const RenderComments=({id})=>{
   
   const [comments,setComments]=useState([])
   const [userId,setUserId]=useState(null)
   const [commentText,setCommentText]=useState('')
   useEffect(()=>{
     const loaduserInfo=async()=>{
       const refreshtoken=await AsyncStorage.getItem('refresh_token')
       const userid=JSON.parse(Base64.decode(refreshtoken.split('.')[1])).user_id
       setUserId(userid)
     }
     loaduserInfo()
   },[])
   useEffect(()=>{
    const source=axios.CancelToken.source()
    const loadComments=async()=>{
      try{
        const res=await(await myaxios()).get('/posts/'+id+'/',{cancelToken:source.token})
        
        setComments(res.data.comments)

      }
      catch(error){
        console.log('request got rejected')
      }
    }
    loadComments()
    
    return ()=>{
      console.log('component un mounted')
      source.cancel()
    }
   },[])
   const SendComment=async()=>{
      const resp=await(await(myaxios())).put('/posts/'+id+'/',{
         post_by:userId,
         comments:[
             {
               comment_by:userId,comment_to:id,comment_text:commentText
             }
         ]

      })      
      setCommentText('')
      setComments(resp.data.comments)

   }
   return <View style={{flex:1}}>
        <View style={{flex:1}}>
           <FlatList 
             data={comments}
             keyExtractor={item=>item.id}
             renderItem={({item})=><View style={{display:'flex',flexDirection:'row',
                   justifyContent:'space-between'
               }}>
                <Image source={{uri:item.get_comment_by_info.profile}} style={{width:50,height:50,borderRadius:25}} />
                <Text>{item.get_comment_by_info.name}</Text>
                <Text style={{padding:10,flexGrow:1,flexWrap:'wrap',fontStyle:'italic'}}>{item.comment_text}</Text>
             </View>}
           />
        </View>

        <View style={{display:'flex',flexDirection:'row',margin:5}}>
           <TextInput style={{flex:1,borderColor:'black',borderWidth:1,borderRadius:10}}
             placeholder='write your comments here...'
             value={commentText}
             onChangeText={(value)=>setCommentText(value)}
           />
           {
             commentText ?
             <Pressable onPress={SendComment}>
             <Text style={{marginTop:15}}>send</Text>
           </Pressable>
           :null
           }

           
        </View>
   </View>
   
 
}

export default RenderComments




/*
<KeyboardAvoidingView behavior='height' style={{flex:1}}>
       <View style={{flex:1,margin:5,}}>
         <FlatList 
           data={comments}
           ItemSeparatorComponent={()=><View style={{height:5}}></View>}
           keyExtractor={(item)=>item.id}
           renderItem={({item})=><View style={{display:'flex',flexDirection:'row',
                                                 justifyContent:'space-between',
                          backgroundColor:'rgba(123,123,123,0.2)'
                      }}>
            <Image source={{uri:item.get_comment_by_info.profile}} style={{width:50,height:50,
              borderRadius:25}}/>
            <Text style={{flexGrow:1}}>{item.get_comment_by_info.name}</Text>
            <Text style={{marginTop:10,flexGrow:1,flexWrap:'wrap',fontStyle:'italic'}}>{item.comment_text}</Text>
            </View>}
         />
       </View>
       <View style={{paddingBottom:28,display:'flex',flexDirection:'row'}}>
          <TextInput style={{borderWidth:1,borderColor:'rgba(100,50,10,0.9)',borderRadius:20,
          backgroundColor:'rgba(231,231,231,0.8)',flex:1
            
         }}
            placeholder='enter your post in modal'
            onChangeText={(commentText)=>setCommentText(commentText)}
          />
          {
            commentText ?
            <Pressable onPress={SendComment}>
               <Text style={{fontSize:20,marginTop:10,marginLeft:5,
              backgroundColor:'yellow'
              }}><Icon name='send-sharp' size={30} color='skyblue'/></Text>
            </Pressable>
             : null
          }
          
       </View>
   </KeyboardAvoidingView>
*/



























