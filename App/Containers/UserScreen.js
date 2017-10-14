// @flow

import React from 'react'
import {
         View,
         ActivityIndicator,
         Image,
         ScrollView
} from 'react-native'
import {
  Button,
  Container,
  Content,
  Card,
  CardItem,
  H2,
  H3,
  Text
} from 'native-base'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import UserContact from '../Components/UserContact'
import UserActions from '../Redux/UsersRedux.js'
import UserServices from './UserServices'
import LoginSignUpButtons from '../Components/LoginSignUpButtons'
import { Images } from '../Themes/'
import CommonHeader from '../Components/CommonHeader'


// Styles
import styles from './Styles/UserScreenStyle'

class UserScreen extends React.Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(UserActions.usersRequest(this.props.uuid))
  }

  componentWillReceiveProps (newProps) {
    // Use case: Not logged in user tries to access a user profile
    // it will show login/signup buttons. After user log-in, try to ask
    // for user again.
    if ((!this.props.loggedIn)
      && (newProps.loggedIn)) {
      const { dispatch } = this.props
      dispatch(UserActions.usersRequest(this.props.uuid))
    }
  }

  renderMap (user) {
    if (user.location) {
      return (
        <View style={styles.mapSection}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(user.location.latitude),
              longitude: parseFloat(user.location.longitude),
              latitudeDelta: 0.032,
              longitudeDelta: 0.031
            }}
          />
        </View>
      )
    } else {
      return (
        <H3>{I18n.t('Location Not Available')}</H3>
      )
    }
  }

  renderProfilePhoto (user) {
    var uri
    if (user.picture) {
      source = {uri: user.picture}
    } else {
      source = Images.profilePlaceholder
    }

    return (
      <Image style={styles.avatar} source={source} />
    )
  }

  renderEditButton () {
    if ((this.props.loggedUser) && (this.props.loggedUser.uuid === this.props.user.uuid)) {
      return (
        <RoundedButton
          onPress={() => {
            NavigationActions.editProfile({uuid: this.props.user.uuid})
          }}
        >
          {I18n.t('Edit Profile')}
        </RoundedButton>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render (uuid) {
    if (!this.props.loggedIn) {
      return (
        <Container>
          <CommonHeader title={I18n.t('User')} />
          <Container style={styles.mainContainer}>
            <Content padder>
            <Text>{I18n.t('You need to be logged in')}</Text>
            <Content padder>
              <LoginSignUpButtons />
            </Content>
            </Content>
          </Container>
        </Container>
      )
    }
    const { user } = this.props
    if (!user) {
      return (
        <Container style={styles.mainContainer}>
          <ActivityIndicator />
        </Container>
      )
    } else {
      return (
        <Container>
          <CommonHeader title={user.name} />
          <Content padder>
            <Card>
              {this.renderMap(user)}
              {this.renderProfilePhoto(user)}
              <CardItem cardBody style={styles.section}>
                <UserContact user={user} />
              </CardItem>
              <CardItem cardBody style={styles.section}>
                {this.renderEditButton()}
              </CardItem>
            </Card>
            <Card>
              <CardItem cardBody style={styles.section}>
                <H2>{I18n.t('Services being offered')}</H2>
              </CardItem>
              <CardItem cardBody style={styles.section}>
                <UserServices userUuid={this.props.uuid} />
              </CardItem>
            </Card>
          </Content>
        </Container>
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
    loggedIn: state.login.key,
    loggedUser: state.login.user,
    user: state.users['entities'][ownProps.uuid]
  }
}

export default connect(mapStateToProps)(UserScreen)
