// @flow

import React from 'react'
import { WebView } from 'react-native'
import { connect } from 'react-redux'
import { Container } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CommonHeader from '../Components/CommonHeader'

// Styles
import styles from './Styles/AboutScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class AboutScreen extends React.Component {

  render () {
    return (
      <Container>
        <CommonHeader title={I18n.t('About')} />
        <WebView
          source={{uri: 'https://www.semillasocial.org/landing/porque/'}}
          style={styles.webView}
        />
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
