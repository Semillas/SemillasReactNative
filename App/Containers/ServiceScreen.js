// @flow

import React, { PropTypes } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import ServiceActions from '../Redux/ServiceRedux.js'
import RoundedButton from '../Components/RoundedButton'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent
} from 'react-native-card-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Images } from '../Themes/'
// Styles
import styles from './Styles/ServiceScreenStyle'
import Swiper from 'react-native-swiper';
import I18n from 'react-native-i18n'

class ServiceScreen extends React.Component {

  componentWillMount () {
    const { dispatch } = this.props
    // TODO: Check if the service is not loaded.
    dispatch(ServiceActions.serviceRequest(this.props.uuid))
  }

  renderPhotos(data) {
    if ((data.photos) && (data.photos.length)) {
      photoViews = []
      for (var i=0; i < data.photos.length; i++) {
        photoViews.push(
          <View key={i}>
            <Image
              style={styles.picture}
              source={{ uri: data.photos[i]['photo'] }}
            />
          </View>
        )
      }
      return (
        <Swiper
          width={350}
          height={300}
          showsButtons={true}
          showsPagination
          automaticallyAdjustContentInsets>

          {photoViews}
        </Swiper>
      )
    } else {
      return (
        <Image
          style={styles.picture}
          source={Images.servicePlaceholder}
        />
      )
    }
  }

  renderCallToAction(service) {
    if ((this.props.loggedUser) && (this.props.loggedUser.uuid == service.author.uuid)){
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
        <ScrollView style={styles.mainContainer}>
          {this.renderPhotos(service)}
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
              <Text >Usuario: {service.author.name || service.author.email || service.author.username }</Text>
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
