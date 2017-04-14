// @flow

import React, { PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import FeedActions from '../Redux/FeedRedux.js'
import RoundedButton from '../Components/RoundedButton'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent
} from 'react-native-card-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
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
      const card = {card: {width: 320}}
      return (
        <View style={styles.mainContainer}>
          <Card styles={card}>
            <CardImage>
              <Image
                style={{width: 300, height: 200}}
                source={{ uri: service.photos[0]['photo'] }}
              />
            </CardImage>
            <CardTitle>
              <Text style={styles.title}>{service.title}</Text>
            </CardTitle>
            <CardContent>
              <Text>{service.description}</Text>
            </CardContent>
          </Card>
          <TouchableOpacity
            onPress={() => {
              NavigationActions.user({uuid: service.author.uuid})
            }}
          >
            <View>
              <Text >Usuario: {service.author.name || service.author.email || service.author.username }</Text>
              <RoundedButton
                onPress={() => {
                  NavigationActions.user({uuid: service.author.uuid})
                }}
              >
                Lo quiero!
              </RoundedButton>
            </View>
          </TouchableOpacity>
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
