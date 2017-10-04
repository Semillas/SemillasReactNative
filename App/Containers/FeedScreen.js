// @flow

// An Feed Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, Text } from 'react-native'
import { Content } from 'native-base'
import styles from './Styles/FeedScreenStyle'

// Components to show examples (only real point of merge conflict)
import '../Components/AlertMessage'
import '../Components/FullButton'
import '../Components/RoundedButton'
import '../Components/DrawerButton'
import Feed from '../Containers/Feed'
// import '../Components/MapCallout'

class FeedScreen extends React.Component {

  renderAndroidWarning () {
    if (Platform.OS === 'android') {
      return (
        <Text style={styles.sectionText}>
          Android only: Animations are slow? You are probably running the app in debug mode.
          It will run more smoothly once your app will be built.
        </Text>
      )
    }
    return null
  }

  render () {
    return (
      <Content padder style={styles.mainContainer}>
        <Feed />
      </Content>
    )
  }
}

export default FeedScreen
