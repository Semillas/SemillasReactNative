// @flow

import React, { PropTypes } from 'react'
import { Text,
         View,
         ActivityIndicator,
         Image,
         ScrollView
} from 'react-native'
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
        <Text>Location Not Available</Text>
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
      <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
        <Image style={styles.avatar} source={source} />
      </View>
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
        <View style={styles.mainContainer}>
          <Text>{I18n.t('You need to be logged in')}</Text>
          <View style={styles.section}>
            <LoginSignUpButtons />
          </View>
        </View>
      )
    }
    const { user } = this.props
    if (!user) {
      return (
        <View style={styles.mainContainer}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <ScrollView style={styles.mainContainer}>
            {this.renderMap(user)}
          <View style={styles.section}>
            {this.renderProfilePhoto(user)}
            <UserContact user={user} />
          </View>
            {this.renderEditButton()}
          <Text style={styles.subSectionText}>{I18n.t('Services being offered')}</Text>
          <UserServices userUuid={this.props.uuid} />
        </ScrollView>
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
