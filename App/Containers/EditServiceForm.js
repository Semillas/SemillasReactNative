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

  handlePressDelete = () => {
    if (this.props.uuid) {
      this.props.attemptServiceDelete(this.props.uuid)
    }
    else if (this.props.newService) {
      this.props.attemptServiceDelete(this.props.newService)
    }
    NavigationActions.feed()
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

  renderDeleteButton() {
    if ((this.props.uuid) || (this.props.newService)){
      return(
        <TouchableOpacity
          style={Styles.button}
          onPress={this.handlePressDelete}
        >
         <Text style={Styles.buttonText}>{I18n.t('Delete Service')}</Text>
        </TouchableOpacity>
      )
    } else {
      return (<View />)
    }
  }

  renderPublishButtonText() {
    if (this.props.posting) {
      return (
        <Text style={Styles.buttonText}>{I18n.t('Publishing')}</Text>
      )
    } else if (!(this.props.error) && (this.props.newService)) {
      return (
        <Text style={Styles.buttonText}>{I18n.t('Published')}</Text>
      )
    } else {
       return (
        <Text style={Styles.buttonText}>{I18n.t('Publish')}</Text>
      )
    }
  }

  render () {
    const { title, description, category, seedsPrice } = this.state
    const { fetching } = this.state
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container]} keyboardShouldPersistTaps='always'>
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
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.title) ? this.props.error['title'][0] : ''}
              </Text>
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
                placeholder={I18n.t('Description')} />
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.description) ? this.props.error['description'][0] : ''}
              </Text>
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
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.seeds_price) ? this.props.error['seeds_price'][0] : ''}
              </Text>
            </View>
            <Text style={Styles.errorLabel}>
              { (this.props.error && this.props.error.non_field_errors) ? this.props.error['non_field_errors'][0] : ''}
            </Text>

            <View style={[Styles.loginRow]}>
              <ServicePhotos serviceUuid={this.props.uuid ? this.props.uuid : this.props.newService} />
            </View>
            {this.renderDeleteButton()}
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressPost}>
              <View style={Styles.buttonCta}>
                {this.renderPublishButtonText()}
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
    service: state.services.items[ownProps.uuid],
    newService: state.services.newService,
    deleting: state.services.deleting,
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
    attemptServiceDelete:
      (uuid) => dispatch(ServiceActions.serviceDeletionRequest(uuid)),
    retrieveService: (uuid) => dispatch(ServiceActions.serviceRequest(uuid)),
    clearNewService: () => dispatch(ServiceActions.clearNewService())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceForm)
