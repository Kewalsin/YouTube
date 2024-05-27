import { FlatList, StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import axios from 'react-native-axios'
import { baseURL } from '../Components/Api';
import { useNavigation } from '@react-navigation/native';
import ButtonShow from './ButtonShow';
 const EvereGreenAdd = ({setIsLoading,}) => {
const navigation =useNavigation()
  const [videoData, setVideoData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  useEffect(()=>{
    FetchApiData();
  },[]) 



  const FetchApiData= async()=>{

    try {
      setIsLoading(true)
        const {data,status}= await axios.get(baseURL);
        if(status===200){


            setVideoData(data.data["Evergreen Ads"])  
          
        }
        
    } catch (error) {
        console.log(error);
        
    }finally{
      setIsLoading(false)

      setShowHeader(true);
    }


  }
  const handleImagePress = (videoUrl) => {
navigation.navigate("Video",{url:videoUrl,videoData:videoData})
    
  };
  return (


    <>
    
    {
      showHeader && (
        <>
        {/* <View style={{height:60,backgroundColor:"#FFF",alignItems:"center",justifyContent:"center"}}>
        <Text style={[styles.showMoreText,{color:"#000",fontSize:20}]}>BOUBOULENA CREATIVE</Text>

</View> */}

      <View style={{alignItems:"center",marginTop:40,marginBottom:20}}>
        <Text style={[styles.showMoreText,{fontSize:20,borderBottomWidth:1,borderColor:"#FFF"}]}>Evergreen Ads</Text>
    </View>
    </>
      )
    }
    
    

    <FlatList
 data={showAll ? videoData : videoData.slice(0, 1)} 

        renderItem={({item})=>(


            <View style={{marginHorizontal:20}}>


<View style={styles.mainView}>

<TouchableOpacity onPress={() => handleImagePress(item.url)}>

  <Image source={{uri: item.p_image}} style={styles.image} 
      resizeMode='stretch'
  />
</TouchableOpacity>

<View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',marginTop:20
                }}>
                <Image
                  source={{uri: item.p_image}}
                  style={{height: 50, width: 50, borderRadius: 30}}
                />
                <View style={{width:240}}>
                  <Text style={[styles.itemName,{}]}>{item.p_name}</Text>
                  <Text style={[styles.itemName,{marginTop:5}]}>@-{item.cat_name}</Text>
                  <Text style={[styles.itemName,{marginTop:5}]}>@-{item.created_at}</Text>
                </View>
              </View>



    {/* <Text style={styles.url}>{item.url}</Text> */}
 
 
</View>
 {!showAll && videoData.length > 1 && (
        <TouchableOpacity onPress={() => setShowAll(true)}>
        <ButtonShow/>
        </TouchableOpacity>
      )}
</View>

        )}
    />


    </>
  )
}

export default EvereGreenAdd

const styles = StyleSheet.create({
    container:{
        
    },
    mainView: {
        display: 'flex',
        marginBottom: 20,
        marginVertical:20
    
    
      },
      image: {
        height: 180,
        borderRadius: 20,
        width:"100%"
    
      },
      url: {
        color: '#FFF',
      },
      itemName: {
        color: '#FFF',
        fontSize:14,fontWeight:"600",
      },
      showMoreButton: {
        alignSelf: 'center',
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 20,
      },
      showMoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
      },
})
