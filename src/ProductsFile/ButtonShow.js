import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ButtonShow = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          height: 1,
          backgroundColor: '#FFF',
          marginTop: 50,
          marginBottom:30,
          alignItems: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            height: 60,
            width: 60,
            backgroundColor: '#000',
            bottom: 30,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth:1,borderColor:"#FFF"
          }}>
          <Text style={{color: '#FFF',fontSize:14,fontWeight:"300"}}>show more</Text>
        </View>
      </View>
    </View>
  );
};

export default ButtonShow;

const styles = StyleSheet.create({});
