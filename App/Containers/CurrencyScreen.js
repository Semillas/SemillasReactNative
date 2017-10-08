// @flow

import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  H1,
  H3,
  Button,
  Text
} from 'native-base'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CommonHeader from '../Components/CommonHeader'
import AppConfig from '../Config/AppConfig'
// external libs
// Styles
import styles from './Styles/CurrencyScreenStyle'

class CurrencyScreen extends React.Component {

  render () {
    return (
      <Container style={styles.screen}>
        <CommonHeader title={AppConfig.CurrencyName} />
        <Container>
          <Container style={styles.thisContainer}>
            <H1>
              {this.props.user.wallet.balance + ' ' + AppConfig.CurrencyName}
            </H1>
            <H3>
              {I18n.t('Activity')}
            </H3>

            <Button
              block
              style={styles.cta}
              onPress={NavigationActions.performTransaction}
              >
              <Text>{I18n.t('Transfer')} </Text>
            </Button>
             </Container>
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyScreen)
