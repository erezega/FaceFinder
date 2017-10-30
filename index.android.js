import React, { Component } from 'react';
import { StyleSheet, View, AppRegistry } from 'react-native';
import Main from './src/components/main/main';

export default class FaceFinder extends Component {
  render() {
    return (
      // <View style={styles.main}>
        <Main/>
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: '#03A9F4',
//     height: 100,
//   },
// });

AppRegistry.registerComponent('FaceFinder', () => FaceFinder);