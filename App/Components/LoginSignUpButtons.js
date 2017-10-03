// @flow

import React from 'react'
import { View } from 'react-native'
import {
  Button,
  Container,
  Content,
  Text
} from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

type LoginSignUpButtonsProps = {
  onPress: () => void,
  text?: string,
  children?: string,
  navigator?: Object
}

export default class LoginSignUpButtons extends React.Component {
  props: LoginSignUpButtonsProps

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <Content>
        <Button block
          style={{marginTop:20}}
          onPress={NavigationActions.login}
        >
          <Text> {I18n.t('Login')} </Text>
        </Button>
        <Button block
          style={{marginTop:20}}
          onPress={NavigationActions.signup}
        >
          <Text>{I18n.t('Sign Up')}</Text>
        </Button>
      </Content>
    )
  }
}
