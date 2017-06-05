// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import EditServiceForm from './EditServiceForm'

class EditServiceScreen extends React.Component {

  render () {
    return (
      <View >
        <EditServiceForm uuid={this.props.uuid} />
      </View >
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.uuid,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceScreen)
