// @flow

import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import UserActions from '../Redux/UsersRedux.js'

// Styles
import styles from './Styles/UserScreenStyle'

class UserScreen extends React.Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(UserActions.usersRequest(this.props.uuid))
  }

  render (uuid) {
    const { user } = this.props
    if (!user) {
      return (
        <View style={styles.mainContainer}>
          <Text>Loading</Text>
          <View style={styles.section}>
            <Text>UserScreen Container</Text>
          </View>
          <View style={styles.section}>
            <Text>UserScreen Container</Text>
            <Text>uuid: {this.props.uuid}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.mainContainer}>
          <Text>Loaded</Text>
          <View style={styles.section}>
            <Text>{user.name}</Text>
          </View>
          <View style={styles.section}>
            <Text>UserScreen Container</Text>
            <Text>uuid: {this.props.uuid}</Text>
          </View>
        </View>
      )
    }
  }
}

UserScreen.propTypes = {
  uuid: PropTypes.string,
  requestUser: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.uuid,
    user: state.users['entities'][ownProps.uuid]
  }
}

export default connect(mapStateToProps)(UserScreen)
