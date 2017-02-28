// @flow

import React, { PropTypes } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/UserScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class UserScreen extends React.Component {

  render () {
    return (
//      <ScrollView style={styles.container}>
//        <KeyboardAvoidingView behavior='position'>
      <View style={styles.mainContainer}>
          <Text>UserScreen Container</Text>
       <View style={styles.section}>
          <Text>UserScreen Container</Text>
      </View>
     <View style={styles.section}>
          <Text>UserScreen Container</Text>
      </View>
      </View>

//        </KeyboardAvoidingView>
//      </ScrollView>
    )
  }

}

UserScreen.propTypes = {
  uuid: PropTypes.string,
  requestUser: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.params.uuid,
    user: state.users[uuid]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUser: (uuid) => dispatch(UserActions.userRequest(uuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)
