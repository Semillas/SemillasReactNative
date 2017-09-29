import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Animated, TouchableOpacity } from 'react-native'
import { Images, Colors } from '../Themes'
import Styles from './Styles/CommonHeaderStyle'
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
  }

  render () {
    return (
        <Header style={Styles.container} rounded androidStatusBarColor={Colors.coal}>
          <Left>
            <Button
              transparent
              onPress={Actions.pop}
            >
              <Icon style={Styles.text} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.text} >{this.props.title}</Title>
          </Body>
          <Right />
        </Header>
    )
  }
}
