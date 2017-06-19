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
  LayoutAnimation,
  KeyboardAvoidingView
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

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;


class EditServiceForm extends React.Component {
  props: ServicePostProps

  state: {
    title: string,
    description: string,
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
      title: '',
      description: '',
      category: 1,
      seedsPrice: '1',
      visibleHeight: Metrics.screenHeight,
      fetching: false,
      uuid: null
    }
    this.isAttempting = false
  }

  assignServiceToState (service) {
    this.state.title = service.title
    this.state.description = service.description
    this.state.seedsPrice = String(service.seeds_price)
    this.state.category = service.category.id
    this.state.uuid = service.uuid
  }

  componentWillReceiveProps (newProps) {
    if (newProps.service) {
      // Update form with service values
      this.assignServiceToState(newProps.service)
    }
    // Handle notification bar
    if ((this.props != newProps.fetching) && (newProps.fetching == false)){
      // Post Request has finished
      if (newProps.error) {
				MessageBarManager.showAlert({
					title: 'Hubo un Error',
					message: 'El campo Precio en Semillas debe ser un número',
					alertType: 'error',
					// See Properties section for full customization
					// Or check `index.ios.js` or `index.android.js` for a complete example
				});
      } else {
				MessageBarManager.showAlert({
					title: 'Publicado',
					message: 'El servicio se ha publicado correctamente',
					alertType: 'success',
					// See Properties section for full customization
					// Or check `index.ios.js` or `index.android.js` for a complete example
				});
      }
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

	componentDidMount() {
		// Register the alert located on this master page
		// This MessageBar will be accessible from the current (same) component, and from its child component
		// The MessageBar is then declared only once, in your main component.
		MessageBarManager.registerMessageBar(this.refs.alert);
	}

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()

    this.props.clearNewService()

		// Remove the alert located on this master page from the manager
		MessageBarManager.unregisterMessageBar();

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
    var { title, description, category, seedsPrice, uuid } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.

    if (!uuid) {
      uuid = this.props.newService
    }
    this.props.attemptServicePost(title, description, category, seedsPrice, uuid)
//    this.props.feedClear()
//    this.props.feedRequest()

    // With this it gets updated on Service success.
    //this.props.retrieveService(this.props.uuid)
    //Solution: Update right away the service redux
  }

  handleChangeTitle = (text) => {
    this.setState({ title: text })
  }

  handleChangeDescription = (text) => {
    this.setState({ description: text })
  }

  handleChangeSeedsPrice = (text) => {
    this.setState({ seedsPrice: text })
  }

  render () {
    const { title, description, category, seedsPrice } = this.state
    const { fetching } = this.state
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container]} keyboardShouldPersistTaps='always'>
         <MessageBarAlert ref="alert" />
         <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
          <View style={Styles.form}>
            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('Title')}</Text>
              <TextInput
                ref='title'
                style={textInputStyle}
                value={title}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='sentences'
                autoCorrect={false}
                onChangeText={this.handleChangeTitle}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.description.focus()}
                placeholder={I18n.t('Title')} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('Description')}</Text>
              <TextInput
                ref='description'
                style={textInputStyle}
                value={description}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='sentences'
                autoCorrect
                onChangeText={this.handleChangeDescription}
                numberOfLines={8}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.seedsPrice.focus()}
                placeholder={I18n.t('description')} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('Seeds Price')}</Text>
              <TextInput
                ref='seedsPrice'
                style={textInputStyle}
                value={seedsPrice}
                editable={editable}
                keyboardType='numeric'
                returnKeyType='next'
                autoCorrect={false}
                onChangeText={this.handleChangeSeedsPrice}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressPost}
                placeholder={''} />
            </View>
            <View style={[Styles.loginRow]}>
              <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressPost}>
                <View style={Styles.loginButton}>
                  <Text style={Styles.loginText}>{I18n.t('Publish')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[Styles.loginRow]}>
              <ServicePhotos serviceUuid={this.props.uuid} />
            </View>
          </View>
        </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.services.fetching,
    error: state.services.error,
    uuid: ownProps.uuid,
    service: state.services.items[ownProps.uuid],
    newService: state.services.newService
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptServicePost:
      (title, description, category, seedsPrice, uuid) => dispatch(
        ServiceActions.servicePostRequest(
          title,
          description,
          category,
          seedsPrice,
          uuid
        )
      ),
    retrieveService: (uuid) => dispatch(ServiceActions.serviceRequest(uuid)),
    clearNewService: () => dispatch(ServiceActions.clearNewService())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceForm)
