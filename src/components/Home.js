import React, {Component, Dimensions} from 'react';

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
import GL from 'gl-react-native';
import Slider from 'react-native-slider';

var {
  width,
  height
} = Dimensions.get('window')

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
      value: 0.2,
      width:0,
      height: 0,
      saturation: 1,
      brightness: 1,
      contrast: 1,
      hue: 0,
      sepia: 0,
      gray: 0,
      mixFactor: 0
    }
  }

  renderWithDimensions(layout) {
    var {
      width,
      height
    } = layout.nativeEvent.layout;
    this.setState({
      width,
      height
    })
  }

  getImage() {
    return (
      <Instagram
        brightness={this.state.brightness}
        saturation={this.state.saturation}
        contrast={this.state.contrast}
        hue={this.state.hue}
        gray={this.state.gray}
        sepia={this.state.sepia}
        mixFactor={this.state.mixFactor}
        width={this.state.width}
        height={this.state.height}
      >
        <Image
          source={{uri: 'http://i.imgur.com/dSIa9jl.jpg'}}
          style={styles.cover}
          resizeMode="cover"
        />
      </Instagram>
    )
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
            <View style={styles.container}>
              <View style={styles.container} onLayout={this.renderWithDimensions}>
                { this.state.width ? this.getImage() : null}
              </View>
              <ScrollView style={styles.container}>
                <View>
                  <Text>Blend Factor: {this.state.mixFactor}</Text>
                  <Slider
                    value={this.state.mixFactor}
                    minimumValue={0}
                    maximumValue={2}
                    onValueChange={(mixFactor) => this.setState({mixFactor})}
                  />
                </View>
                <View>
                  <Text>Brightness: {this.state.brightness}</Text>
                  <Slider
                    value={this.state.brightness}
                    minimumValue={0}
                    maximumValue={3}
                    onValueChange={(brightness) => this.setState({brightness})}
                  />
                </View>
                <View>
                  <Text>Saturation: {this.state.saturation}</Text>
                  <Slider
                    value={this.state.saturation}
                    minimumValue={0}
                    maximumValue={3}
                    onValueChange={(saturation) => this.setState({saturation})}
                  />
                </View>
                <View>
                  <Text>Contrast: {this.state.contrast}</Text>
                  <Slider
                    value={this.state.contrast}
                    minimumValue={0}
                    maximumValue={3}
                    onValueChange={(contrast) => this.setState({contrast})}
                  />
                </View>
                <View>
                  <Text>Sepia: {this.state.sepia}</Text>
                  <Slider
                    value={this.state.sepia}
                    minimumValue={0}
                    maximumValue={1}
                    onValueChange={(sepia) => this.setState({sepia})}
                  />
                </View>
                <View>
                  <Text>Grayscale: {this.state.gray}</Text>
                  <Slider
                    value={this.state.gray}
                    minimumValue={0}
                    maximumValue={1}
                    onValueChange={(gray) => this.setState({gray})}
                  />
                </View>
                <View>
                  <Text>Hue: {this.state.hue}</Text>
                  <Slider
                    value={this.state.hue}
                    minimumValue={0}
                    maximumValue={10}
                    onValueChange={(hue) => this.setState({hue})}
                  />
                </View>
              </ScrollView>
            </View>
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
  }
};

const shaders = GL.Shaders.create({
  instagram: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D tex;
      uniform float saturation;
      uniform float brightness;
      uniform float contrast;
      uniform float hue;
      uniform float gray;
      uniform float sepia;
      uniform float mixFactor;
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      const mat3 rgb2yiq = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);
      const mat3 yiq2rgb = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.1070, 1.7046);
      const vec3 SEPIA = vec3(1.2, 1.0, 0.8);
      vec3 BrightnessContrastSaturation(vec3 color, float brt, float con, float sat)
      {
        vec3 black = vec3(0., 0., 0.);
        vec3 middle = vec3(0.5, 0.5, 0.5);
        float luminance = dot(color, W);
        vec3 gray = vec3(luminance, luminance, luminance);

        vec3 brtColor = mix(black, color, brt);
        vec3 conColor = mix(middle, brtColor, con);
        vec3 satColor = mix(gray, conColor, sat);
        return satColor;
      }
      vec3 multiplyBlender(vec3 Color, vec3 filter){
        vec3 filter_result;
        float luminance = dot(filter, W);

        if(luminance < 0.5)
          filter_result = 2. * filter * Color;
        else
          filter_result = Color;

        return filter_result;
      }
      vec3 ovelayBlender(vec3 Color, vec3 filter){
        vec3 filter_result;
        float luminance = dot(filter, W);

        if(luminance < 0.5)
          filter_result = 2. * filter * Color;
        else
          filter_result = 1. - (1. - (2. *(filter - 0.5)))*(1. - Color);

        return filter_result;
      }
      vec3 applyHue(vec3 Color, float h) {
        vec3 yColor = rgb2yiq * Color;
        float originalHue = atan(yColor.b, yColor.g);
        float finalHue = originalHue + (h);
        float chroma = sqrt(yColor.b*yColor.b+yColor.g*yColor.g);
        vec3 yFinalColor = vec3(yColor.r, chroma * cos(finalHue), chroma * sin(finalHue));
        return vec3(yiq2rgb*yFinalColor);
      }
      vec3 applyGray(vec3 Color, float g) {
        float gray = dot(Color, vec3(0.299, 0.587, 0.114));
        return mix(Color, vec3(gray, gray, gray), g);
      }
      vec3 applySepia(vec3 Color, float s) {
        float gray = dot(Color, vec3(0.299, 0.587, 0.114));
        return mix(Color, vec3(gray) * SEPIA, s);
      }
      void main() {
        vec2 st = uv.st;
        vec3 irgb = texture2D(tex, st).rgb;
        vec3 filter = texture2D(tex, st).rgb;
        vec3 bcs_result = BrightnessContrastSaturation(irgb, brightness, contrast, saturation);
        vec3 hue_result = applyHue(bcs_result, hue);
        vec3 sepia_result = applySepia(hue_result, sepia);
        vec3 gray_result = applyGray(sepia_result, gray);
        vec3 after_filter = mix(gray_result, multiplyBlender(gray_result, filter), mixFactor);

        gl_FragColor = vec4(after_filter, 1.);
      }
    `
  }
});

var Instagram = GL.createComponent(
  ({ brightness, saturation, contrast, hue, gray, sepia, mixFactor, children, ...rest }) =>
  <GL.View
    {...rest}
    shader={shaders.instagram}
    uniforms={{ brightness, saturation, contrast, hue, gray, sepia, mixFactor }}>
    <GL.Uniform name="tex">{children}</GL.Uniform>
  </GL.View>
, { displayName: "Instagram" });

export default Home
