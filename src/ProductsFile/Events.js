import { FlatList, StyleSheet, Text, View,Image,TouchableOpacity ,Dimensions} from 'react-native'
import React, { useEffect ,useState} from 'react'
import axios from 'react-native-axios'
import { baseURL } from '../Components/Api';
import WebView from 'react-native-webview';
import ButtonShow from './ButtonShow';
 const Events = ({setIsLoading}) => {
  
  
  const [videoData, setVideoData] = useState([]);
  const [showHeader, setShowHeader] = useState(false);
  const [videosToShow, setVideosToShow] = useState(2);

  useEffect(()=>{
    FetchApiData();
  },[])

  const FetchApiData= async()=>{
    try {
      setIsLoading(true)
        const {data,status}= await axios.get(baseURL);
        if(status===200){
            setVideoData(data.data["Events"])
        }
        
    } catch (error) {
        console.log(error);
        
    }finally{
      setIsLoading(false)
      setShowHeader(true)
    }

  }
  const handleShowMore =()=>{
    setVideosToShow((prev) => prev + 4);

  }
  const { width } = Dimensions.get('window');
  const aspectRatio = 10 / 10;
  const height = width / aspectRatio;
  return (
    <>
    {
      showHeader && (
        <View style={{alignItems:"center",marginTop:40,marginBottom:30}}>
        <Text style={[styles.showMoreText,{fontSize:20,borderBottomWidth:1,borderColor:"#FFF"}]}>EVENTS</Text>
    </View>
      )
    }
    
    <FlatList

data={videoData.slice(0, videosToShow)}
initialNumToRender={5}
        maxToRenderPerBatch={10}

numColumns={2}


        renderItem={({item})=>(
            <View style={{marginLeft:10}}>


<View style={styles.mainView}>


 


        <WebView
        source={{ uri: item.url}}
        // style={styles.video}
        style={{height,width,backgroundColor:"#000"}}
        
      />

    {/* </View> */}
    <View style={{alignItems:"center"}}>

  <Text style={[styles.itemName,{width:140}]}>{[item.p_name]}</Text>
    </View>



    {/* <Text style={styles.url}>{item.url}</Text> */}
 
 
</View>
 
</View>
        )}
    />
   {videosToShow < videoData.length &&  (
        <TouchableOpacity onPress={handleShowMore} style={{marginHorizontal:20}} >
        <ButtonShow/>
        </TouchableOpacity>
      )}


    </>
  )
}

export default Events

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    mainView: {
        display: 'flex',
        marginBottom: 20,
        marginVertical:20,
        // paddingHorizontal:10
        marginHorizontal:10,
    
    
      },
      image: {
        height: 250,
        borderRadius: 20,
        width:140,
        borderRadius:20

    
      },
      url: {
        color: '#FFF',
      },
      itemName: {
        color: '#FFF',
        fontSize:14,fontWeight:"600",marginTop:20
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
