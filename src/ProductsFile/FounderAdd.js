import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import axios from 'react-native-axios';
import {baseURL} from '../Components/Api';
import {useNavigation} from '@react-navigation/native';
import ButtonShow from './ButtonShow';
import WebView from 'react-native-webview';

const FounderAdd = ({setIsLoading}) => {
  const navigation = useNavigation();
  const [videoData, setVideoData] = useState([]);
  const [videosToShow, setVideosToShow] = useState(1);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    FetchApiData();
  }, []);

  const FetchApiData = async () => {
    try {
      setIsLoading(true);
      const {data, status} = await axios.get(baseURL);
      if (status === 200) {
        setVideoData(data.data['Founder Ads']);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setShowHeader(true);
    }
  };

  const handleImagePress = (videoUrl, type) => {
    if (type !== 'vrt') {
      navigation.navigate('Video', {url: videoUrl, videoData: videoData});
    }
  };

  const renderItem = useCallback(
    ({item}) => (
      <View style={{marginHorizontal: 20}}>
        <View style={styles.mainView}>
          {item.type === 'vrt' ? (
            <View style={{alignItems: 'center'}}>
              <WebView source={{uri: item.url}} style={styles.video} />
              <Text style={styles.itemName}>{item.p_name}</Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => handleImagePress(item.url, item.type)}>
                <Image
                  source={{uri: item.p_image}}
                  style={styles.image}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                  marginTop:30
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
            </>
          )}
        </View>
      </View>
    ),
    [videoData],
  );

  const handleShowMore = () => {
    setVideosToShow(prev => prev + 5);
  };

  return (
    <>
      {showHeader && (
        <View style={{alignItems: 'center', marginTop: 40, marginBottom: 20}}>
          <Text
            style={[
              styles.showMoreText,
              {fontSize: 20, borderBottomWidth: 1, borderColor: '#FFF'},
            ]}>
            Founder Add
          </Text>
        </View>
      )}

      <FlatList
        data={videoData.slice(0, videosToShow)}
        renderItem={renderItem}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={21}
        keyExtractor={(item, index) => index.toString()}
      />

      {videosToShow < videoData.length && (
        <TouchableOpacity
          onPress={handleShowMore}
          style={{marginHorizontal: 20}}>
          <ButtonShow />
        </TouchableOpacity>
      )}
    </>
  );
};

export default FounderAdd;

const styles = StyleSheet.create({
  container: {},
  mainView: {
    display: 'flex',
    marginBottom: 20,
    marginVertical: 20,
  },
  image: {
    height: 180,
    borderRadius: 20,
    width: '100%',
  },
  itemName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    // marginTop: 20,
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
  video: {
    height: 300,
    width: 170,
    backgroundColor: '#333',
  },
});
