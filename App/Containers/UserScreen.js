// @flow

import React, { PropTypes } from 'react'
import { Text,
         View,
         ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import UserActions from '../Redux/UsersRedux.js'
import MapView from 'react-native-maps'
import UserServices from './UserServices'
import I18n from 'react-native-i18n'
import LoginSignUpButtons from '../Components/LoginSignUpButtons'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/UserScreenStyle'

class UserScreen extends React.Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(UserActions.usersRequest(this.props.uuid))
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
              latitudeDelta: 0.0032,
              longitudeDelta: 0.0031
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
        <ScrollView style={styles.mainContainer}>
          {this.renderMap(user)}
          <View style={styles.section}>
            {this.renderEditButton()}
          </View>
          <View style={styles.section}>
            <Text>{user.name}</Text>
          </View>
          <Text>{I18n.t('Services being offered')}</Text>
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
