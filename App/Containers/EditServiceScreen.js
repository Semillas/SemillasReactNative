// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import EditServiceForm from './EditServiceForm'

class EditServiceScreen extends React.Component {

  render () {
    return (
      <EditServiceForm uuid={this.props.uuid} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.uuid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceScreen)
