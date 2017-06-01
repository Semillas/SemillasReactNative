// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import UserScreen from './UserScreen'

// Styles
import styles from './Styles/ProfileScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class ProfileScreen extends React.Component {

  render () {
    return (
      <UserScreen uuid={this.props.userUuid} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userUuid: state.login.user.uuid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
