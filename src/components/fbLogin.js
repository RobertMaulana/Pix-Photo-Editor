import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FBSDK, {LoginManager} from 'react-native-fbsdk';

export default class fbLogin extends Component {

  _fbAuth(){
      LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
        if (result.isCancelled) {
          console.log('Login was canceled');
        }else {
          console.log('Login was success' + result.grantedPermissions.toString());
        }
      }, function(error){
        console.log('An error occured');
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth()}>
          <Text>Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
