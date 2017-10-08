// @flow

import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  H1,

} from 'native-base'
import CommonHeader from '../Components/CommonHeader'
import AppConfig from '../Config/AppConfig'
import I18n from 'react-native-i18n'
// external libs
// Styles
import styles from './Styles/PerformTransactionScreenStyle'

class PerformTransactionScreen extends React.Component {

  render () {
    return (
      <Container>
        <CommonHeader title={I18n.t('Transfer')} />
        <Container style={styles.containerasd}>
          <Content >
            <H1>
              {this.props.user.wallet.balance + ' ' + AppConfig.PerformTransactionName}
            </H1>
          </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(PerformTransactionScreen)
