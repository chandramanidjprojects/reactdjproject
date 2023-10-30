import React,{useLayoutEffect,Component,useEffect,useState} from 'react';
import {Text,View,FlatList,Image,Button, RefreshControl,Dimensions
} from 'react-native';
import Axios from './Axios';
import Video from 'react-native-video';
import { MyContext } from './Axios';
import axios from 'axios';

const {width,height}=Dimensions.get('window')
const wait=(time)=>{
  return new Promise(resolve=>{
    setTimeout(resolve,time)
  })
}

class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      
      paused_id:null,
      repeat:false,
      focus_status:false,
      scroll:true,


    
    }
    this.viewabilityConfig={
      minimumViewTime:400,
      
      viewAreaCoveragePercentThreshold:50
    }
    this.ref=React.createRef(null)

  }

  componentDidMount(){

  }
  componentDidUpdate(){
   if(this.state.scroll && this.props.loading){

    this.ref.current.scrollToIndex({index:0})
    this.setState({scroll:false})
   }
    
  }

  onViewableItemsChanged=({viewableItems,changed})=>{
    this.setState({paused_id:changed[0].item.id,focus_status:true})
    
  }

renderItems=({item})=>{
  return <View style={{marginBottom:30,width}}>
          
           <View style={{display:'flex',flexDirection:'row',backgroundColor:'skyblue',marginBottom:3}}>
             <Image style={{width:60,height:60,borderRadius:30}} 
               source={{uri:item.post_by.profile}}/>
             <Text style={{marginTop:15,marginLeft:20}}>{item.post_by.email} {item.id}</Text>
           </View>
           <Video style={{height:400}}
            source={{uri:item.file+'/'}}
            resizeMode='cover'
            controls={this.state.paused_id===item.id ? true :false}
            //paused={this.state.paused_id===item.id ? false :true}
            paused={true}
            repeat={this.state.paused_id===item.id ? true :false}

           />
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
        {
          item.postlike_set.find(i=>i.like_by===this.props.user_id) ?
          <Text style={{color:'red'}}>likes {item.postlike_set.length}</Text> :
          <Text>likes {item.postlike_set.length}</Text>
        }

        <Text>comment</Text>
        <Text>Share </Text>
      </View>
   </View>
}
  scrollToIndexFailed=(error)=>{
     const offset=error.averageItemLength * error.index
     this.ref.current.scrollToOffset({offset})
     this.ref.current.scrollToIndex({index:error.index})
  }
  _onRefresh=()=>{
       this.props.setLoad(true)
       wait(2000).then(()=>this.props.setLoad(false))
  }
  render(){
    console.log('home render')
   return <MyContext.Consumer>
    {
      ({content})=><View >
      <FlatList contentContainerStyle={{margin:5,backgroundColor:'rgba(200,100,20,0.2)'}} 
        refreshing={this.props.load}
        onRefresh={this._onRefresh}
        ref={this.ref}
        data={content}
        ItemSeparatorComponent={()=><View style={{height:10,backgroundColor:'white'}}></View>}
        keyExtractor={item=>item.id}
        renderItem={({item})=><this.renderItems item={item}/>}
        viewabilityConfig={this.viewabilityConfig}       
        onViewableItemsChanged={this.onViewableItemsChanged}
        onScrollToIndexFailed={this.scrollToIndexFailed}    
      />      
     </View>
    }
   </MyContext.Consumer>  
  }
}

export default Axios(Main)
