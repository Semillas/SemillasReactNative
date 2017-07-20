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
import ServiceActions from '../Redux/ServiceRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import ServicePhotos from './ServicePhotoUploader'

type ServicePostProps = {
  dispatch: () => any,
  fetching: boolean,
  uuid: string,
  attemptServicePost: () => void,
  retrieveService: () => void,
  clearNewService: () => void,
  service: Object
}

class EditServiceForm extends React.Component {
  props: ServicePostProps

  state: {
    name: string,
    email: string,
    category: number,
    seed_price: number,
    visibleHeight: number,
    uuid: string,
    topLogo: {
      width: number
    },
    fetching: boolean
  }

  isAttempting: boolean
  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: ServicePostProps) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      visibleHeight: Metrics.screenHeight,
      fetching: false,
      uuid: null
    }
    this.isAttempting = false
  }

  assignServiceToState (service) {
    this.state.name = service.name
    this.state.email = service.email
    this.state.phone = String(service.phone)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.service) {
      // Update form with service values
      this.assignServiceToState(newProps.service)
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468 or https://github.com/facebook/react-native/issues/14275
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

    if (this.props.uuid) {
      // Editing a service
      if (this.props.service) {
        this.assignServiceToState(this.props.service)
      } else {
        this.props.retrieveService(this.props.uuid)
      }
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()

    this.props.clearNewService()
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
    var { name, email, category, phone, uuid } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.

    this.props.attemptProfilePost(name, email, category, phone, uuid)
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
    const { name, email, phone } = this.state // TODO: Add category
    const { fetching } = this.state
    const editable = !fetching
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
              onChangeText={this.handleChangeemail}
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
              onChangeText={this.handleChangeSeedsPrice}
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
          // <View style={[Styles.loginRow]}>
          //   <ServicePhotos serviceUuid={this.props.uuid ? this.props.uuid : this.props.newService} />
          // </View>
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
    fetching: state.services.fetching,
    posting: state.services.posting,
    error: state.services.error,
    uuid: ownProps.uuid,
    deleting: state.services.deleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProfilePost:
      (name, email, phone, uuid) => dispatch(
        ServiceActions.servicePostRequest(
          name,
          email,
          category,
          phone,
          uuid
        )
      ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceForm)
