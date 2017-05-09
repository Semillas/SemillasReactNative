// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import EditServiceForm from './EditServiceForm'

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
