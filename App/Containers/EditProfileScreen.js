// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import EditProfileForm from './EditProfileForm'

// Styles
import styles from './Styles/EditProfileScreenStyle'

class EditProfileScreen extends React.Component {

  render () {
    return (
      <View >
        <EditProfileForm uuid={this.props.uuid} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
