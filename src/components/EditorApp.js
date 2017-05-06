import React, {Component} from 'react';
import {
  Button,
  View,
  Text
} from 'native-base';

import {
  Modal
} from 'react-native';

import ResponsiveImage from 'react-native-responsive-image';

class EditorApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  openModal() {
    this.setState({modalVisible: true});
  }
  closeModal() {
    this.setState({modalVisible: false});
  }

  render(){
    return (
      <Modal
        animationType = {"slide"}
        transparent = {false}
        visible = {this.state.modalVisible}
        onRequestClose = {() => {alert("Modal has been closed.")}}
        >
        <View>
          <ResponsiveImage source={{uri: this.props.image}} initWidth="420" initHeight="500"/>
          <Button
            onPress = {() => this.closeModal()}
          >
            <Text>Cancel</Text>
          </Button>
        </View>
      </Modal>
    )
  }
}

export default EditorApp
