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
import EditServiceForm from './EditServiceForm'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/EditServiceScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class EditServiceScreen extends React.Component {

  render () {
    return (
      <View >
        <EditServiceForm />
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceScreen)
