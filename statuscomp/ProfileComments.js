import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Image,Modal,Pressable,TextInput} from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import myaxios from '../components/myaxios';
function ProfileComments(props){
    const [visible,setVisible]=useState(true)
    const [comments,setComments]=useState([])
    const [value,setValue]=useState('')
    const source=axios.CancelToken.source()
    useEffect(()=>{
      const get_data=async()=>{
         try{
           const res=await(await myaxios()).get('/users/'+props.route.params.id+'/',{cancelToken:source.token})
           console.log()
           setComments(res.data.profile_comments)
        }
         catch(error){

            console.log('')
         }
      }
      get_data()
     return ()=>{
        source.cancel()
     }
    },[])
    const HandleComment=async()=>{
        try{
            const res=await(await myaxios()).put('/users/'+props.route.params.id+'/',{
                email:'xxx@gmail.com',
                profile_comments:[{comment_by:props.user_id,comment_to:props.route.params.id,comment_text:value}]
            })
            setComments(res.data.profile_comments)
         }
          catch(error){
 
             console.log(error)
          }        
    }
    return <Modal visible={visible} onRequestClose={()=>{     
      setVisible(false)
      props.navigation.navigate('status1')    
     }
    }> 
      <View style={{flex:1}}>
      <Text onPress={()=>{
        setVisible(false)
        props.navigation.navigate('status1')    
        }}><Icon name='arrow-back' size={30}/>{props.status_id}</Text>
      <View style={{flex:1}}>
      <FlatList 
           data={comments}
           keyExtractor={item=>item.id}
           renderItem={({item})=><View style={{flexDirection:'row',justifyContent:'space-between',
               backgroundColor:'black'
             }}>
              <Image 
                source={{uri:`http://192.168.43.58:8000/media/${item.comment_info.profile}/`}}
                style={{width:50,height:50,borderRadius:25}}
              />
              <Text style={{flexGrow:1,color:'white'}}>{item.comment_info.name}</Text>
              <Text style={{margin:10,paddingRight:80,color:'white'}}>{item.comment_text}</Text>
           </View>}
        />
      </View>
        <View >
          <TextInput 
            placeholder='enter comments here.....'
            multiline
            value={value}
            onChangeText={(value)=>setValue(value)}
          />
          <Text onPress={HandleComment}>text 2</Text>
        </View>
    </View>
    </Modal>
}
export default ProfileComments







