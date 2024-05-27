import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';
import { baseURL } from './Api';
const VideoScreen = ({ route }) => {
  const navigation = useNavigation();
  const { url, videoData } = route.params;
  const [selectedVideo, setSelectedVideo] = useState(url);
  const initialVideoName = videoData.find(item => item.url === url)?.p_name || videoData[0]?.p_name;
  const [selectedVideoName, setSelectedVideoName] = useState(initialVideoName);
  const [apiVideos, setApiVideos] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const filteredPropVideoData = videoData.filter(item => item.type === 'hrz');

  const playVideo = (videoUrl, videoName) => {
    setSelectedVideo(videoUrl);
    setSelectedVideoName(videoName);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      setIsLoading(true)
      const { data, status } = await axios.get(baseURL);
      if (status === 200) {
        const apiVideoList = [
          ...data.data['Founder Ads'],
          ...data.data['DRONE VIDEOS'],
          ...data.data['Evergreen Ads'],
          ...data.data['Testimonial Ads'],
          ...data.data['PODCAST'],
        ];
        setApiVideos(apiVideoList);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false)

    }
  };

  const { width } = Dimensions.get('window');
  const aspectRatio = 16 / 9;
  const height = width / aspectRatio;

  const combinedVideoData = [...filteredPropVideoData, ...apiVideos.filter(item => item.type === 'hrz')];

  return (
    <View style={styles.container}>
      <View style={{ height: 350, backgroundColor: '#000' }}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
            <AntDesign name="arrowleft" size={30} color={'#FFF'} />
          </TouchableOpacity>
          <Text style={[styles.itemText, { color: '#FFF', fontSize: 20, marginLeft: 40 }]}>
            BOUBOULENA CREATIVE
          </Text>
        </View>
        <WebView source={{ uri: selectedVideo }} style={{ height, width, backgroundColor: '#000' }} />
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
          <Text style={[styles.itemText, { fontSize: 15 }]}>{selectedVideoName}</Text>
        </View>
      </View>
      {
        isLoading ? (
          <ActivityIndicator  size={"large"} color={"#FFF"}/>
        ):(
          <FlatList
        data={combinedVideoData}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => playVideo(item.url, item.p_name)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                  marginTop: 20,
                  marginHorizontal: 20
                }}
              >
                <Image
                  source={{ uri: item.p_image }}
                  style={styles.thumbnail}
                />
                <View style={{ width: 180 }}>
                  <Text style={[styles.itemText, {}]}>{item.p_name}</Text>
                  <Text style={[styles.itemText, { marginTop: 5 }]}>@-{item.cat_name}</Text>
                  <Text style={[styles.itemText, { marginTop: 5 }]}>@-{item.created_at}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `${item.url}-${index}`}
      />
        )
      }

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    height: 250,
    width: 300,
    marginVertical: 50,
    borderRadius: 20
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#000'
  },
  listItem: {
    flexDirection: 'row',
    padding: 20,
  },
  thumbnail: {
    height: 80,
    width: 120,
    borderRadius: 10,
  },
  itemDetails: {
    justifyContent: 'center',
    width: 150,
    marginLeft: 20,
  },
  itemText: {
    color: '#FFF',
  },
  headerStyle: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default VideoScreen;
