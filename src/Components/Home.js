import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DronVideo from '../ProductsFile/DronVideo';
import Events from '../ProductsFile/Events';
import EditinalBrand from '../ProductsFile/EditinalBrand';
import Education from '../ProductsFile/Education';
import Prodcast from '../ProductsFile/Prodcast';
import FounderAdd from '../ProductsFile/FounderAdd';
import EvereGreenAdd from '../ProductsFile/EvereGreenAdd';
import SalesAdd from '../ProductsFile/SalesAdd';
import TestimonialAdd from '../ProductsFile/TestimonialAdd';
import ProblemSolAdd from '../ProductsFile/ProblemSolAdd';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';
const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [videoData, setVideoData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const data = [
    {
      key: 'Founder Ads',
      component: (
        <FounderAdd
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'Evergreen Ads',
      component: (
        <EvereGreenAdd
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'Sales Ads',
      component: (
        <SalesAdd
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'Testimonial Ads',
      component: (
        <TestimonialAdd
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'Problem | Solution Ads',
      component: (
        <ProblemSolAdd
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'DronVideo',
      component: (
        <DronVideo
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'Events',
      component: (
        <Events setIsLoading={setIsLoading} />
      ),
    },
    {
      key: 'EditinalBrand',
      component: (
        <EditinalBrand
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'Education',
      component: (
        <Education
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 'Prodcast',
      component: (
        <Prodcast
          setIsLoading={setIsLoading}
        />
      ),
    },
  ];

  const fetchVideoData = async () => {
    setIsLoading(true);
    try {
      const {data, status} = await axios.get(
        `https://impactmindz.in/client/boub/back_end/api/product`,
      );
      if (status === 200) {
        setVideoData(data.data); 
      }else{
        setErrorMessage("Failed to fetch data from the server")
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  return (
    <View style={styles.container}>
    
    

     

      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#FFF"
          style={styles.activityIndicator}
        />
      )}

{
  errorMessage ? (
<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  <Text style={{color:"#FFF",fontSize:20}}>{errorMessage}</Text>
</View>
  ):(
    <>
    <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'data:image/png;base64,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',
            }}
            style={styles.logo}
          />
          <Text style={styles.text1}>YouTube</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <AntDesign name="search1" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    <FlatList
        data={videoData.length > 0 ? videoData : data} // Use videoData if available
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            {videoData.length > 0 ? (
              <Text style={styles.videoTitle}>{item.title}</Text> // Adjust based on the structure of your API response
            ) : (
              item.component
            )}
          </View>
        )}
        keyExtractor={item => (videoData.length > 0 ? item.p_id : item.key)} // Adjust keyExtractor for video data
      />
    </>
    
  )
}
     

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0 0 0)',
  },
  header: {
    height: 40,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 45,
    borderRadius: 10,
  },
  text1: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1,
  },
  itemContainer: {
    marginBottom: 20,
  },
  searchInput: {
    borderColor: '#888',
    color: '#000',
    backgroundColor: '#FFF',
    width: 230,
  },
  videoTitle: {
    color: '#FFF',
    fontSize: 18,
  },
  searchView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
