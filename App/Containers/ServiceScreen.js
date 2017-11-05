// @flow

import React from 'react'
import PropTypes from 'prop-types';
import {
  Image,
  ActivityIndicator,
} from 'react-native'

import {
  Container,
  Content,
  Card,
  CardItem,
  Title,
  Text,
  Left,
  Right,
  Button,
  H2,
  Body
} from 'native-base'
import { connect } from 'react-redux'
import ServiceActions from '../Redux/ServiceRedux.js'
import ImageSwiper from '../Components/ImageSwiper'
import Price from '../Components/Price'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { Images } from '../Themes/'
import CommonHeader from '../Components/CommonHeader'
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
        <Button block
          onPress={() => {
            NavigationActions.editService({uuid: service.uuid})
          }}
        >
          <Text>{I18n.t('Edit')}</Text>
        </Button>
      )
    } else {
      return (
        <Button block
          onPress={() => {
            NavigationActions.user({uuid: service.author.uuid})
          }}
        >
          <Text>{I18n.t('Get it')}</Text>
        </Button>
      )
    }
  }

  renderDistance (data) {
    if ((data.distance == 0) || (data.distance)) {
      return (<Text style={styles.distance}>{data.distance} km</Text>)
    } else {
      return (<Text />)
    }
  }

  render () {
    const { service } = this.props
    if (!service) {
      return (
        <Container style={styles.container}>
          <CommonHeader title={I18n.t('Loading Service')} />
          <ActivityIndicator />
        </Container>
      )
    } else {
      return (
        <Container>
          <CommonHeader title={I18n.t('Service')} />
          <Content padder>
            <Card>
              <CardItem>
                <ImageSwiper images={service.photos} />
              </CardItem>
              <CardItem>
                <Body>
                  <H2>{service.title}</H2>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Price data={service} />
                </Left>
                <Right>
                  <Text> {this.renderDistance(service)} </Text>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{service.description}</Text>
                </Body>
              </CardItem>

              <CardItem>
                <Body>
                  {this.renderCallToAction(service)}
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
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
