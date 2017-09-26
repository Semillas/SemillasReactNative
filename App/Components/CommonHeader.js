import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Animated, TouchableOpacity } from 'react-native'
import { Images, Colors } from '../Themes'
import Styles from './Styles/CustomNavBarStyle'
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";

import { Actions } from 'react-native-router-flux'

export default class CommonHeader extends React.Component {

  static propTypes = {
      title: PropTypes.string,
      navigation: PropTypes.object
  }

  render () {
    return (
        <Header>
          <Left>
            <Button
              transparent
              onPress={Actions.pop}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right />
        </Header>
    )
  }
}


