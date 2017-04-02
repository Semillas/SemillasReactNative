// @flow

import React, { PropTypes } from 'react'
import { Text,
          View,
          StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import UserActions from '../Redux/UsersRedux.js'
import MapView from 'react-native-maps';
import { calculateRegion } from '../Lib/MapHelpers'

// Styles
import styles from './Styles/UserScreenStyle'

const mapStyles = StyleSheet.create({
    container: {
          ...StyleSheet.absoluteFillObject,
          height: 400,
          width: 400,
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
    map: {
          ...StyleSheet.absoluteFillObject,
        },
});



const locations = [
      { title: 'Location A', latitude: 37.78825, longitude: -122.4324 },
      { title: 'Location B', latitude: 37.75825, longitude: -122.4624 }
    ]

const region = calculateRegion(locations, { latPadding: 0.05, longPadding: 0.05 })


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
      //debugger;
      return (
        <View style={styles.mainContainer}>
          <View style={styles.mapSection}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(user.location.latitude),
                longitude: parseFloat(user.location.longitude),
                latitudeDelta: 0.0032,
                longitudeDelta: 0.0031,
              }}
            />
          </View>

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
