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
  Spinner,
  Card,
  CardItem,
  Text
} from 'native-base'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CommonHeader from '../Components/CommonHeader'
import AppConfig from '../Config/AppConfig'
import WalletActions from '../Redux/WalletRedux'
// external libs
// Styles
import styles from './Styles/CurrencyScreenStyle'

class CurrencyScreen extends React.Component {

  componentWillMount () {
    this.props.walletRequest(this.props.user.uuid)
  }

  renderWalletMovements () {
    return (
      this.props.wallet.transactions.map((item, itemKey) => {
        if (item.trans_value > 0) {
          textStyle = styles.movement
        } else {
          textStyle = [styles.movement, styles.red]
        }

        return (
          <CardItem key={itemKey}
            style={styles.thisContainer}
            onPress={() => {NavigationActions.user({uuid: item.user_uuid})}}
            >
            <Text style={textStyle}> {item.user} </Text>
            <Text style={textStyle}> {item.created_at} </Text>
            <Text style={textStyle}> {item.trans_value} </Text>
            <Text style={textStyle}> {item.balance} </Text>
          </CardItem>
        )
      })
    )
  }

  render () {
    if (this.props.wallet) {
      return (
        <Container style={[styles.currencyContainer, styles.mainContainer]}>
          <CommonHeader title={AppConfig.CurrencyName} />
          <Content padder>
              <H1>
                {this.props.wallet.balance + ' ' + AppConfig.CurrencyName}
              </H1>
              <Card>
                <CardItem>
                  <H3>
                    {I18n.t('Activity')}
                  </H3>
                </CardItem>
                {this.renderWalletMovements()}
              </Card>

              <Button
                block
                style={styles.cta}
                onPress={NavigationActions.performTransaction}
                >
                <Text>{I18n.t('Transfer')} </Text>
              </Button>
          </Content>
        </Container>
      )
    } else {
      return (
        <Container style={styles.screen}>
          <CommonHeader title={AppConfig.CurrencyName} />
          <Spinner />
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    wallet: state.wallet.wallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    walletRequest: (ownerUuid) => dispatch(WalletActions.walletRequest(ownerUuid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyScreen)
