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
  View
} from 'native-base';

class About extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() =>
                navigate('Camera')
              }
            >
              <Icon name="camera"/>
            </Button>
          </Left>
          <Body>
            <Title>
              Pix
            </Title>
          </Body>
          <Right>
            <Button>
              <Icon name="menu"/>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>About</Text>
        </Content>
        <Footer >
          <FooterTab>
            <Button>
              <Icon name="apps" />
              <Text>Gallery</Text>
            </Button>
            <Button
              onPress={() =>
                navigate('About')
              }
            >
              <Icon name="person" />
              <Text>About</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default About
