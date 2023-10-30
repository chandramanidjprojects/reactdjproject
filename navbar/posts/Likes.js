import React,{useEffect,useState} from 'react';
import {View,Text,Image,Pressable} from 'react-native';
import { Api } from './Posts';
import myaxios from '../myaxios';
function Likes(props){
  const [like,setLike]=useState({clicked:false,count:0})
  const HandleLike=async(id,status)=>{
    if(status){
            
        setLike({clicked:!like.clicked,count:like.count-1})
        const ax=await(await(myaxios())).delete('/post_likes/'+id+'/')
        console.log(ax.data)
         
      }
      else{
        
        setLike({clicked:!like.clicked,count:like.count+1})
        const ax=await(await(myaxios())).post('/post_likes/',{like_by:props.user_id,like_to:id})              
        console.log(ax.data)
      }

  }
  return <Api.Consumer> 
    
    {
      (data)=>data.postlike_set.find(i=>i.like_by===props.user_id) ?
        <Pressable onPress={()=>HandleLike(data.id,!like.clicked)}>
          <Text style={{color:!like.clicked ? 'green' : 'black'}}>like {
          data.postlike_set.length + like.count
        }   
          </Text>
        </Pressable>

         :
         <Pressable onPress={()=>HandleLike(data.id,like.clicked)} >
        <Text style={{color:like.clicked ? 'green' : 'black'}}>like {
          data.postlike_set.length + like.count
        }
        </Text>
        </Pressable>
      
    }

  </Api.Consumer>
}
export default Likes
