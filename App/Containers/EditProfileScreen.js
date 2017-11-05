// @flow

import React from 'react'
import { connect } from 'react-redux'
import EditProfileForm from './EditProfileForm'

// Styles
import styles from './Styles/EditProfileScreenStyle'

class EditProfileScreen extends React.Component {

  render () {
    return (
      <EditProfileForm uuid={this.props.uuid} />
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
