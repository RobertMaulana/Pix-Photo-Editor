import React, {Component} from 'react';

import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Footer,
  FooterTab,
  Text,
  View,
  Thumbnail,
  Card,
  CardItem,

} from 'native-base';

import {
  CameraRoll,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ResponsiveImage from 'react-native-responsive-image';

// import HeaderApp from './HeaderApp';

class Home extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props)
    this.state = {
      photos: [],
      index: null,
      modalVisible: false,
      imageToEdit: null
    }
  }

  onValueChange (value: string) {
    this.setState({
        selected1 : value
    });
  }
  openModal() {
    this.setState({modalVisible: true});
  }
  closeModal() {
    this.setState({modalVisible: false});
  }

  setIndex(index, image) {
    if (index === this.state.index) {
      index = null
    }
    this.setState({imageToEdit: image})
    this.setState({ index })
  }

  componentDidMount(){
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => this.setState({photos: r.edges}))
  }

  render(){
    const { navigate } = this.props.navigation;

    return (
      <Container>
      {console.log(this.state.index)}
        <Header>
          <Left>
            <Button>
              <Icon name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title>
              Pix Photos
            </Title>
          </Body>
          <Right>
            {this.state.index !== null && (
              <Button>
                <Icon
                  name="ios-checkmark"
                  style={{fontSize: 40, color: 'white'}}
                  onPress={() => this.openModal()}
                />
              </Button>
            )}
          </Right>
        </Header>
        <Content>
          {this.state.photos.map((photo, i) => {
            return (
              <TouchableHighlight
                onPress={this._onPressButton}
                key={i}
                underlayColor='transparent'
                onPress={() => this.setIndex(i, photo.node.image.uri)}
              >

                <ResponsiveImage style={{opacity: i === this.state.index ? 0.5 : 1}} source={{uri: photo.node.image.uri}} initWidth="138" initHeight="138"/>
              </TouchableHighlight>
            )
          })}
        </Content>
        <Footer >
          <FooterTab>
            <Button
              active
              onPress={() => this.getPhotos()}
            >
              <Icon name="apps" />
              <Text>Gallery</Text>
            </Button>
            <Button
              onPress={() =>
                navigate('Camera')
              }
            >
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Modal
          animationType = {"slide"}
          transparent = {false}
          visible = {this.state.modalVisible}
          onRequestClose = {() => {alert("Modal has been closed.")}}
          >
          <View>
            <ResponsiveImage source={{uri: this.state.imageToEdit}} initWidth="420" initHeight="500"/>
            <Button
              onPress = {() => this.closeModal()}
              style={{justifyContent: "center"}}
            >
              <Text>Cancel</Text>
            </Button>
          </View>
       </Modal>
      </Container>
    )
  }
}

export default Home
