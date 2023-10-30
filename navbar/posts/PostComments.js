import React,{useEffect,useState} from 'react';
import {View,Text,Image,Modal,TextInput,FlatList,Pressable} from 'react-native';
import axios from 'axios';
import myaxios from '../myaxios';
import  Icon  from 'react-native-vector-icons/Ionicons';
function PostComments(props){

  const [visible,setVisible]=useState(true)
  const [comments,setComments]=useState([])
  const [commentText,setCommentText]=useState('')
  const [value,setValue]=useState('')
  useEffect(()=>{
    console.log(props.user_id)  
    const source=axios.CancelToken.source()
    const loadComments=async()=>{
      try{
        const res=await(await myaxios()).get('/posts/'+props.route.params.id+'/',{cancelToken:source.token})
        
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
    const resp=await(await(myaxios())).put('/posts/'+props.route.params.id+'/',{
       post_by:props.route.params.post_by,
       comments:[
           {
             comment_by:props.user_id,comment_to:props.route.params.id,comment_text:commentText
           }
       ]

    })      
    setCommentText('')
    setComments(resp.data.comments)

 }
  return <Modal visible={visible} onRequestClose={()=>{
    setVisible(false)
    props.navigation.navigate('poststack')       
       }
    } animationType='fade'>
    <Text onPress={()=>{
        setVisible(false)
        props.navigation.navigate('poststack')
        }}><Icon name='arrow-back' size={30}/>{props.route.params.id}</Text>
    <FlatList 
       data={comments}
       keyExtractor={item=>item.id}
       renderItem={({item})=><View style={{flexDirection:'row',justifyContent:'space-between',
           backgroundColor:'black'
         }}>
          <Image 
            source={{uri:`${item.get_comment_by_info.profile}/`}}
            style={{width:50,height:50,borderRadius:25}}
          />
        <Text style={{flexGrow:1,color:'white'}}>{item.get_comment_by_info.name}</Text>
          <Text style={{margin:10,paddingRight:80,color:'white'}}>{item.comment_text}</Text> 
       </View>}
    />
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
</Modal>
}
export default PostComments
