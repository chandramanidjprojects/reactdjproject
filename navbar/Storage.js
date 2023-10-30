import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base64 } from "js-base64";

async function Storage(){
   let access=await AsyncStorage.getItem('access_token')
   let refresh=await AsyncStorage.getItem('refresh_token')
   let user=null;
   if(refresh && access){
      user=JSON.parse(Base64.decode(refresh.split('.')[1])).user_id
   }
   return {access_token:access,refresh_token:refresh,user_id:user}
}
export default Storage












