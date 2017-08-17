// @flow

import React, { PropTypes } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import ServiceActions from '../Redux/ServiceRedux.js'
import RoundedButton from '../Components/RoundedButton'
import ImageSwiper from '../Components/ImageSwiper'

import {
  Card,
//  CardImage,
  CardTitle,
  CardContent
} from 'react-native-card-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Images } from '../Themes/'
// Styles
import styles from './Styles/ServiceScreenStyle'
import I18n from 'react-native-i18n'

class ServiceScreen extends React.Component {

  componentWillMount () {
    const { dispatch } = this.props
    // TODO: Check if the service is not loaded.
    dispatch(ServiceActions.serviceRequest(this.props.uuid))
  }

  renderCallToAction (service) {
    if ((this.props.loggedUser) && (this.props.loggedUser.uuid === service.author.uuid)) {
      return (
        <RoundedButton
          onPress={() => {
            NavigationActions.editService({uuid: service.uuid})
          }}
        >
          {I18n.t('Edit')}
        </RoundedButton>
      )
    } else {
      return (
        <RoundedButton
          onPress={() => {
            NavigationActions.user({uuid: service.author.uuid})
          }}
        >
          {I18n.t('Get it')}
        </RoundedButton>
      )
    }
  }

  render () {
    const { service } = this.props
    if (!service) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      const card = {card: {width: 320}}
      return (
        <ScrollView style={styles.mainContainer}>
          <ImageSwiper images={service.photos} />
          <Card styles={card}>
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
              {this.renderCallToAction(service)}
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    service: state.services.items[ownProps.uuid],
    loggedUser: state.login.user
  }
}

export default connect(mapStateToProps)(ServiceScreen)
