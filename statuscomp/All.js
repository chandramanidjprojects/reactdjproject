import React,{useEffect,useState} from 'react';
import {View,Text,FlatList} from 'react-native';
import myaxios from '../components/myaxios';
import RenderStatus from './RenderStatus';
import axios from 'axios';
import RenderNewUsers from './RenderNewUsers';
function All(props){
    const source=axios.CancelToken.source()
    const [all,setAll]=useState([])
    useEffect(async()=>{
     try{
        const resp=await(await myaxios()).get('/users/',{cancelToken:source.token})
        console.log('from all..',resp.data)
        setAll(resp.data)
     }   
     catch(err){
        console.log('request get rejected from all users')
     }

      return ()=>{
        source.cancel()
      }
    },[])
    return <View>
       <FlatList 
         data={all}
         keyExtractor={item=>item.id}
         renderItem={({item})=><>
         {
            
           ! item.follow.includes(props.user_id) ?
            <RenderNewUsers item={item} user_id={props.user_id}/> :null
         }
           
         </>}
       />
    </View>
}
export default All



