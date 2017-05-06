import React, {Component} from 'react';
import Camera from 'react-native-camera';
import {
  View,
  Text
} from 'react-native';

import {
  Icon,
} from 'native-base';

class CameraApp extends Component {
  static navigationOptions = {
    header: null
  }
  render(){
    const { goBack } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Icon name="camera" onPress={this.takePicture.bind(this)} style={{fontSize: 70, color: 'white', marginBottom: 5}}/>
        </Camera>
      </View>
    )
  }
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};

export default CameraApp
