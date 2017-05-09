// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ProfileScreenStyle'

class ProfileScreen extends React.Component {

  render () {
    return (
      <View style={{paddingTop: 150}}>
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <Text>ProfileScreen Container</Text>
          </KeyboardAvoidingView>
        </ScrollView>
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
