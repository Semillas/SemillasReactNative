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
// external libs
// Styles
import styles from './Styles/CurrencyScreenStyle'

class CurrencyScreen extends React.Component {

  render () {
    return (
      <Container>
        <CommonHeader title={AppConfig.CurrencyName} />
      <Container style={styles.containerasd}>
        <Content >
          <H1>
            {this.props.user.wallet.balance + ' ' + AppConfig.CurrencyName}
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyScreen)
