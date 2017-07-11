// @flow

import React from 'react'
// import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// import RoundedButton from '../Components/RoundedButton'
// import { Actions as NavigationActions } from 'react-native-router-flux'
import UserScreen from './UserScreen'

// Styles
// import styles from './Styles/ProfileScreenStyle'

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
