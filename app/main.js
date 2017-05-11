/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';
import Meteor from 'react-native-meteor';
import App from './components/App';

const SERVER_URL = 'ws://192.168.3.104:3000/websocket';

export default class Main extends Component {

  componentWillMount() {
    Meteor.connect(SERVER_URL);  
  }

  render() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
  handleAddItem() {
    console.log('TODO: Handle Add Item');
    Meteor.call('tasks.insert', 'hi', (err, res) => {
        // Do whatever you want with the response
        console.log('tasks.insert', err, res);
    });
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
});

AppRegistry.registerComponent('Main', () => Main);
