import React, {Component} from 'react';

import {
  Container,
  Content,
  Header,
  Left,
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
  Button
} from 'native-base';

import {
  CameraRoll,
  Image,
  TouchableHighlight,
  Modal,
  Platform,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ResponsiveImage from 'react-native-responsive-image';
import Slider from 'react-native-slider';
import Share, {ShareSheet} from 'react-native-share';
// import FBSDK, {LoginButton} from 'react-native-fbsdk';


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
      imageToEdit: null,
      visible: false,
      url: ''
    }
  }

  dataImage(){
    const image = this.state.photos[this.state.index].node.image.uri
    RNFetchBlob.fs.readFile(image, 'base64')
    .then((data) => {
      this.setState({url: `data:image/jpg;base64,${data}`})
    })
  }

  share() {
    this.onCancel()
    const image = this.state.photos[this.state.index].node.image.uri
    RNFetchBlob.fs.readFile(image, 'base64')
    .then((data) => {
      console.log(data);
      let shareOptions = {
        title: "React Native Share Example",
        message: "Check out this photo!",
        url: `data:image/jpg;base64,${data}`,
        subject: "Check out this photo!"
      }
      Share.open(shareOptions)
        .then((res) => console.log('res:', res))
        .catch(err => console.log('err', err))
    })
  }

  onCancel() {
    this.setState({visible:false});
  }
  onOpen() {
    this.setState({visible:true});
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
    let shareOptions = {
      title: "React Native",
      message: "Hola mundo",
      url: this.state.url,
      subject: "Share Link" //  for email
    };
    return (
      <Container>
      {console.log(this.state.url)}
        <Header>
          <Left>
            <Button
              onPress={() =>
                navigate('Camera')}
            >
              <Icon name="camera"/>
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
                  name="share"
                  style={{fontSize: 25, color: 'white'}}
                  onPress={this.onOpen.bind(this)}
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
        <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
          <Button iconSrc={{ uri: FACEBOOK_ICON }}
                  onPress={()=>{
                this.onCancel();
                this.dataImage();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "facebook"
                  }));
                },300);
            }}><Text>Facebook</Text></Button>
        </ShareSheet>
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

var styles = {
  container: {
    flex: 1
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

};

const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";

export default Home
