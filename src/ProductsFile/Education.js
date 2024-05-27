import { FlatList, StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import axios from 'react-native-axios'
import { baseURL } from '../Components/Api';
import WebView from 'react-native-webview';
import ButtonShow from './ButtonShow';
 const Education = ({setIsLoading}) => {
  const [showAll, setShowAll] = useState(false);


  const [videoData, setVideoData] = useState([]);
  const [showHeader, setShowHeader] = useState(false);



  useEffect(()=>{
    FetchApiData();
  },[])

  const FetchApiData= async()=>{
    try {
      setIsLoading(true)
        const {data,status}= await axios.get(baseURL);
        if(status===200){
            setVideoData(data.data["EDUCATIONAL"])
        }
        
    } catch (error) {
        console.log(error);
        
    }finally{
      setIsLoading(false)
      setShowHeader(true)

    }

  }
  return (
    <>
    {
      showHeader && (
        <View style={{alignItems:"center",marginTop:40,marginBottom:30}}>
        <Text style={[styles.showMoreText,{fontSize:20,borderBottomWidth:1,borderColor:"#FFF"}]}>EDUCATINAL</Text>
    </View>
      )
    }
   
    <FlatList

data={showAll ? videoData : videoData.slice(0, 1)}

numColumns={2}

        renderItem={({item})=>(
            <View style={{marginLeft:20}}>


<View style={styles.mainView}>


  {/* <Image source={{uri: item.p_image}} style={styles.image} 
      resizeMode='stretch'
  /> */}


        <WebView
        source={{ uri: item.url }}
        style={styles.image}
      />
  <Text style={styles.itemName}>{item.p_name}</Text>



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

export default Education

const styles = StyleSheet.create({
    container:{
    },
    mainView: {
        display: 'flex',
        marginBottom: 20,
        marginVertical:20,
    
    
      },
      image: {
        height: 240,
        borderRadius: 20,
        // width:150
        width:150,backgroundColor:"#000"

    
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
