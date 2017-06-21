// @flow

import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './Styles/RoundedButtonStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import RoundedButton from '../Components/RoundedButton'
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
      <View>
      <RoundedButton
        onPress={NavigationActions.login}
      >
        {I18n.t('Login')}
      </RoundedButton>
      <RoundedButton
        onPress={NavigationActions.signup}
      >
        {I18n.t('Sign Up')}
      </RoundedButton>
      </View>


    )
  }
}
