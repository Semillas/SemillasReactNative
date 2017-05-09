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
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics} from '../Themes'
import ServicePostActions from '../Redux/ServicePostRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import FeedActions from '../Redux/FeedRedux.js'
import I18n from 'react-native-i18n'

type ServicePostProps = {
  dispatch: () => any,
  fetching: boolean,
  uuid: string,
  attemptServicePost: () => void,
  retrieveService: () => void,
  service: object
}

class EditServiceForm extends React.Component {

  props: ServicePostProps

  state: {
    title: string,
    description: string,
    category: integer,
    seed_price: integer,
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

  constructor (props: ServicePostScreenProps) {
    super(props)
    this.state = {
      title: '',
      description: '',
      category: 1,
      seeds_price: '1',
      visibleHeight: Metrics.screenHeight,
      fetching: false,
      uuid: null
    }
    this.isAttempting = false
  }

  assignServiceToState (service) {
    this.state.title = service.title
    this.state.description = service.description
    this.state.seeds_price = String(service.seeds_price)
    this.state.category = service.category
    this.state.uuid = service.uuid
  }

  componentWillReceiveProps (newProps) {
    if (newProps.service) {
      // Update form with service values
      this.assignServiceToState(newProps.service)
    }


    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
     NavigationActions.pop()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

    if (this.props.uuid) {
      // Editing a service
      if (this.props.service){
        this.assignServiceToState(this.props.service)
      } else {
        this.props.retrieveService(this.props.uuid)
      }
    }
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
    const { title, description, category, seeds_price, uuid } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptServicePost(title, description, category, seeds_price, uuid)
  }

  handleChangeTitle = (text) => {
    this.setState({ title: text })
  }

  handleChangeDescription = (text) => {
    this.setState({ description: text })
  }

  handleChangeSeedsPrice = (text) => {
    this.setState({ seeds_price: text })
  }

  render () {
    const { title, description, category, seeds_price } = this.state
    const { fetching } = this.state
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <KeyboardAvoidingView behavior="padding">
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps="always">
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
              autoCorrect={true}
              onChangeText={this.handleChangeDescription}
              numberOfLines={8}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.seeds_price.focus()}
              placeholder={I18n.t('description')} />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('Seeds Price')}</Text>
            <TextInput
              ref='seeds_price'
              style={textInputStyle}
              value={seeds_price}
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
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.servicePost.fetching,
    uuid: ownProps.uuid,
    service: state.feed.items[ownProps.uuid]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptServicePost:
      (title, description, category, seeds_price, uuid) => dispatch(
        ServicePostActions.servicePostRequest(
          title,
          description,
          category,
          seeds_price,
          uuid
        )
      ),
    retrieveService: (uuid) => dispatch(FeedActions.serviceRequest(uuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceForm)
