import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'react-native-axios';
import {baseURL} from './Api';
import { useNavigation } from '@react-navigation/native';
const SearchScreen = () => {
    const navigation=useNavigation()
  const [searchText, setSearchText] = useState('');
  const [videoData, setVideos] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const filteredVideos = videoData.filter(
    video =>
      video.type === 'hrz' && 
      (video.p_name.toLowerCase().includes(searchText.toLowerCase()) ||
      video.url.toLowerCase().includes(searchText.toLowerCase()) ||
      video.p_image.toLowerCase().includes(searchText.toLowerCase())),
  );

  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    try {
      setIsLoading(true)
      const {data, status} = await axios.get(baseURL);
      if (status === 200) {
        const alldata = [
            ...data.data['Founder Ads'],
          ...data.data['DRONE VIDEOS'],
          ...data.data['Evergreen Ads'],
          ...data.data['Testimonial Ads'],
          ...data.data['PODCAST'],
        ];
        setVideos(alldata);
        setIsLoading(false)
      }else{
        setErrorMessage("Failed to fetch data from the server")

      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching data');

    }
  };

  const handleSearch = item => {
    navigation.navigate("Video",{url:item,videoData:videoData})
  };

  return (
    <View style={styles.container}>


      <View style={styles.searchView}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={'#FFF'} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity >
          <AntDesign name="search1" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>

      {
        isLoading ? <ActivityIndicator 
          size={'large'} color={"#FFF"} 
          style={{ marginTop:50}}
        /> :  errorMessage ? (
<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  <Text style={{color:"#FFF",fontSize:20}}>{errorMessage}</Text>
</View>
  ):(
    <FlatList
        data={filteredVideos}
        keyExtractor={item => item.p_id}

        renderItem={({item}) => (
          <TouchableOpacity style={styles.videoItem} 
          onPress={()=>handleSearch(item.url)}>
            <Text style={styles.title}>{item.p_name}</Text>
            <Image source={{uri: item.p_image}} style={styles.img} />
            <Feather name="arrow-up-left" size={20} color="#FFF" />
          </TouchableOpacity>
        )}
      />

  )
        
       
      }

     
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  searchInput: {
    height: 40,
    width: 220,
    borderRadius: 50,
    borderColor: '#888',
    color: '#FFF',
    backgroundColor: '#666',
    width: 230,
    paddingHorizontal: 10,
  },

  searchView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchIgn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    marginHorizontal: 20,
    marginVertical:20
  },
  title: {
    fontSize: 14,
    width: 150,
    fontWeight: 'bold',
    color: '#FFF',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  img: {height: 80, width: 100, borderRadius: 10},
});
