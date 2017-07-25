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
import { connect } from 'react-redux'
import Styles from './Styles/EditServiceFormStyle'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

type ProfilePostProps = {
  dispatch: () => any,
  uuid: string,
  attemptProfilePost: () => void,
  profile: Object
}

class EditProfileForm extends React.Component {
  props: ProfilePostProps

  state: {
    name: string,
    email: string,
    phone: string,
    visibleHeight: number,
    uuid: string,
    topLogo: {
      width: number
    },
  }

  isAttempting: boolean
  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: ProfilePostProps) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      visibleHeight: Metrics.screenHeight,
      uuid: null
    }
    this.isAttempting = false
  }

  assignProfileToState (profile) {
    this.state.name = profile.name
    this.state.email = profile.email
    this.state.phone = profile.phone
    this.state.uuid= profile.uuid
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468 or https://github.com/facebook/react-native/issues/14275
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

    this.assignProfileToState(this.props.profile)

//    if (this.props.uuid) {
//      // Editing a service
//      if (this.props.service) {
//        this.assignServiceToState(this.props.service)
//      } else {
//        this.props.retrieveService(this.props.uuid)
//      }
//    }
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

  handlePressPost = () => {
    var { name, email, phone, uuid } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.

    this.props.attemptProfilePost(name, email, phone, uuid)
  }

  handleChangeName = (text) => {
    this.setState({ name: text })
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePhone = (text) => {
    this.setState({ phone: text })
  }

//  renderPublishButtonText () {
//    if (this.props.posting) {
//      return (
//        <Text style={Styles.buttonText}>{I18n.t('Publishing')}</Text>
//      )
//    } else if (!(this.props.error) && (this.props.newService)) {
//      return (
//        <Text style={Styles.buttonText}>{I18n.t('Published')}</Text>
//      )
//    } else {
//      return (
//        <Text style={Styles.buttonText}>{I18n.t('Publish')}</Text>
//      )
//    }
//  }

  render () {
    const { name, email, phone } = this.state
    const editable = !this.props.posting
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('Name')}</Text>
            <TextInput
              ref='name'
              style={textInputStyle}
              value={name}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='words'
              autoCorrect={false}
              onChangeText={this.handleChangeName}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.email.focus()}
              placeholder={I18n.t('Name')} />
            <Text style={Styles.errorLabel}>
              { (this.props.error && this.props.error.name) ? this.props.error['name'][0] : ''}
            </Text>
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('Email')}</Text>
            <TextInput
              ref='email'
              style={textInputStyle}
              value={email}
              editable={editable}
              keyboardType='email-address'
              returnKeyType='next'
              autoCapitalize='sentences'
              autoCorrect
              onChangeText={this.handleChangeEmail}
              numberOfLines={8}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.phone.focus()}
              placeholder={I18n.t('email')} />
            <Text style={Styles.errorLabel}>
              { (this.props.error && this.props.error.email) ? this.props.error['email'][0] : ''}
            </Text>
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('Phone')}</Text>
            <TextInput
              ref='phone'
              style={textInputStyle}
              value={phone}
              editable={editable}
              keyboardType='phone-pad'
              returnKeyType='next'
              autoCorrect={false}
              onChangeText={this.handleChangePhone}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressPost}
              placeholder={'+34 654 321 321'} />
            <Text style={Styles.errorLabel}>
              { (this.props.error && this.props.error.phone) ? this.props.error['phone'][0] : ''}
            </Text>
          </View>
          <Text style={Styles.errorLabel}>
            { (this.props.error && this.props.error.non_field_errors) ? this.props.error['non_field_errors'][0] : ''}
          </Text>
          <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressPost}>
            <View style={Styles.buttonCta}>
              <Text style={Styles.buttonText}>{I18n.t('Publish')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.login.postError,
    profile: state.login.user,
    posting: state.login.posting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProfilePost:
      (name, email, phone, uuid) => dispatch(
        LoginActions.profilePostRequest(
          name,
          email,
          phone,
          uuid
        )
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm)
