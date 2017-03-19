// @flow

import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import FeedActions from '../Redux/FeedRedux.js'

// Styles
import styles from './Styles/ServiceScreenStyle'

class ServiceScreen extends React.Component {

  componentWillMount () {
    const { dispatch } = this.props
    // TODO: Check if the service is not loaded.
    dispatch(FeedActions.serviceRequest(this.props.uuid))
  }

  render (uuid) {
    const { service } = this.props
    if (!service) {
      return (
        <View style={styles.mainContainer}>
          <Text>Loading</Text>
          <View style={styles.section}>
            <Text>ServiceScreen Container</Text>
          </View>
          <View style={styles.section}>
            <Text>ServiceScreen Container</Text>
            <Text>uuid: {this.props.uuid}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.mainContainer}>
          <Text>Loaded</Text>
          <View style={styles.section}>
            <Text>{service.title}</Text>
          </View>
          <View style={styles.section}>
            <Text>ServiceScreen Container</Text>
            <Text>uuid: {this.props.uuid}</Text>
          </View>
        </View>
      )
    }
  }
}

ServiceScreen.propTypes = {
  uuid: PropTypes.string,
  requestService: PropTypes.func,
  service: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.uuid,
    service: state.feed.items[ownProps.uuid]
  }
}

export default connect(mapStateToProps)(ServiceScreen)
