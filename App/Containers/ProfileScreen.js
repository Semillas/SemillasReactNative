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

// Styles
import styles from './Styles/ProfileScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class ProfileScreen extends React.Component {

  render () {
    return (
      <View >
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <Text>ProfileScreen Container</Text>
          </KeyboardAvoidingView>
        </ScrollView>
          <Text>ProfileScreen Container</Text>
          <Text>ProfileScreen Container</Text>
          <Text>ProfileScreen Container</Text>
        <RoundedButton text='Editar Perfil' onPress={NavigationActions.editProfile} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
