// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import {
  Container,
  Content,
  Button
} from 'native-base'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import CommonHeader from '../Components/CommonHeader'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}

class LoginScreen extends React.Component {

  props: LoginScreenProps

  state: {
    email: string,
    password: string,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: LoginScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const { email, password } = this.state
    this.props.attemptLogin(email, password)
  }

  handleChangeEmail= (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { email, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <Container>
        <CommonHeader title={I18n.t('Login')} />
        <Content contentContainerStyle={Styles.center} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
          <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
          <View style={Styles.form}>
            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('email')}</Text>
              <TextInput
                ref='email'
                style={textInputStyle}
                value={email}
                editable={editable}
                keyboardType='email-address'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeEmail}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder={I18n.t('email')} />
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.email) ? this.props.error['email'][0] : ''}
              </Text>
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('Password')}</Text>
              <TextInput
                ref='password'
                style={textInputStyle}
                value={password}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={this.handleChangePassword}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressLogin}
                placeholder={I18n.t('Password')} />
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.password) ? this.props.error['password'][0] : ''}
              </Text>
            </View>
            <Text style={Styles.errorLabel}>
              { (this.props.error && this.props.error.non_field_errors) ? this.props.error['non_field_errors'][0] : ''}
            </Text>

            <Button
              transparent
              info
              onPress={NavigationActions.recoverPassword}
              >
              <Text>{I18n.t('Forgot password?')}</Text>
            </Button>


            <View style={[Styles.loginRow]}>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>{I18n.t('signIn')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Content>

      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password) => dispatch(LoginActions.loginRequest(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
