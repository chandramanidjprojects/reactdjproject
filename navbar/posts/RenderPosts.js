import React,{useEffect,useState} from 'react';
import {View,Text,Image} from 'react-native';
import formats from '../formats';
import { Api } from './Posts';
import Video from 'react-native-video';
import Likes from './Likes';
import Comments from './Comments';
import AddFriend from './AddFriend';
import Shares from './Shares';
import { useFocusEffect } from '@react-navigation/native';
function RenderPosts(props){
  const [focus,setFocus]=useState(true)
  useFocusEffect(React.useCallback(()=>{
      console.log('render posts focused.....')
    return ()=>{
      console.log('render posts blured....')
    }
  },[]))
  return <Api.Consumer>
  {
    (data)=><>
       {
        
        formats(data.file) ? 
        
        <View>
          <Text>{data.get_post_by_info.name}</Text>
          <Video style={{height:500}}
             source={{uri:data.file}}
             resizeMode='cover'
             paused={props.paused}
             controls={true}
          />
        </View>
        :
       <View>
         <Text>{data.get_post_by_info.name}</Text>
         <Image source={{uri:data.file}} style={{height:500,resizeMode:'cover'}}/>
       </View>
       }
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Likes  {...props}/>
        <Comments  {...props} />
        <Shares  {...props}/>
        <AddFriend  {...props}/>

      </View>       
      
    </>
  }
</Api.Consumer> 
}

export default React.memo(RenderPosts)