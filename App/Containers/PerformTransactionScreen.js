// @flow

import React from 'react'
import {
  TouchableOpacity,
  View,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  H1,
  H2,
  H3,
  Card,
  CardItem,
  Text,
  Spinner,
  Left,
  Right,
  Body,
  Button,
  Thumbnail,
  Form,
  Item,
  Label,
  Toast,
  Input
} from 'native-base'
import CommonHeader from '../Components/CommonHeader'
import AppConfig from '../Config/AppConfig'
import I18n from 'react-native-i18n'
// external libs
// Styles
import styles from './Styles/PerformTransactionScreenStyle'

import SearchBar from '../Components/SearchBar'
import UsersActions from '../Redux/UsersRedux'
import WalletActions from '../Redux/WalletRedux'

class PerformTransactionScreen extends React.Component {

  constructor () {
    super()
    this.state = {
      amount: '',
      recipient: null,
      displaySearchUser: false
    }
  }

  componentWillMount () {
    if (!this.props.wallet) {
      this.props.walletRequest(this.props.user.uuid)
    }
  }

  cancelSearch = () => {
    this.props.cancelSearch()
    this.setModalVisible(false)
    this.state.recipient = null
  }

  onSearch = (searchTerm) => {
    this.props.performSearch(searchTerm)
  }

  setRecipient(recipient) {
    this.state.recipient = recipient
    this.setModalVisible(false)
    this.props.cancelSearch()
  }

  renderUsersList = () => {
    if (this.props.searchResults) {
      return (this.props.searchResults.map((item, itemKey) =>
        <TouchableOpacity key={itemKey} onPress={() => this.setRecipient(item)}>
          <CardItem>
              <Text> {item.name + ' - ' + item.email} </Text>
          </CardItem>
        </TouchableOpacity>
      ))
    } else {
    }
  }

  renderSearchResults = () => {
    return (
      this.renderUsersList()
    )
  }

  renderRecipient= () => {
    if (this.state.recipient) {
      return(
        <Card padder>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: this.state.recipient.picture}} />
              <Body>
                <Text>{this.state.recipient.name + ' - ' + this.state.recipient.email} </Text>
              </Body>
          </Left>
          </CardItem>
        </Card>
      )
    } else {
      return (
        <View />
      )
    }
  }

  setModalVisible (visible) {
    this.setState({displaySearchUser: visible});
  }

  renderSearchUserModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.displaySearchUser}
        onRequestClose={() => this.setModalVisible(false)}
        >
          <Content padder>
          <H3 style={{paddingTop:20}}>
            {I18n.t('Choose recipient:')}
          </H3>
          <Text note>{I18n.t("Can search by name, full email, full phone (with +prefix) or Telegram Id")} </Text>

          <SearchBar onSearch={this.onSearch} searchTerm={this.props.searchTerm} onCancel={this.cancelSearch} />
          { (this.props.searching) ? <Spinner /> : <View /> }
          {this.renderSearchResults()}
      </Content>
      </Modal>
    )
  }


  componentWillReceiveProps (newProps) {
    if (newProps.transactionError != this.props.transactionError) {
      Toast.show({
        text: newProps.transactionError,
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
  }


  render () {
    return (
      <Container>
        <CommonHeader title={I18n.t('Transfer') + ' ' + AppConfig.CurrencyName} />
        <Container style={styles.container}>
          <Content padder>
            <H2>
              {this.props.wallet ? (this.props.user.wallet.balance + ' ' + AppConfig.CurrencyName + ' ' + I18n.t('in your wallet')) : AppConfig.CurrencyName}
            </H2>
            <Card padder>
              <CardItem>
                <Left>
                  <H3 style={{paddingTop:20}}>
                    {I18n.t('Recipient: ')}
                  </H3>
                </Left>
                <Body style={{paddingTop:25}}>
                  <Button
                    transparent
                    onPress={() => this.setModalVisible(true)}
                    >
                    <Text> {I18n.t('Search User')} </Text>
                  </Button>
                </Body>
              </CardItem>
              <CardItem>
                {this.renderSearchUserModal()}
                {this.renderRecipient()}
              </CardItem>
              <CardItem>
                <Left>
                  <H3 style={{paddingTop:20}}>
                    {I18n.t('Amount:')}
                  </H3>
                </Left>
                <Right>
                  <Item floatingLabel>
                    <Label>{AppConfig.CurrencyName}</Label>
                    <Input
                      value={this.state.amount}
                      keyboardType={'numeric'}
                      paceholder={'0.0'}
                      onChangeText={(amount) => this.setState({amount})}
                    />
                  </Item>
                </Right>
              </CardItem>
              <Content style={{paddingTop: 60}}>
                <Button full disabled={!(parseFloat(this.state.amount) && this.state.recipient)} onPress={() => this.props.performTransfer(
                    this.props.user.uuid,
                    this.state.recipient.uuid,
                    this.state.amount)} >
                  <Text> {I18n.t('Send')} </Text>
                </Button>
              </Content>
            </Card>
          </Content>
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    searchTerm: state.users.searchText,
    searchResults: state.users.searchResults,
    searching: state.users.searching,
    transactionError: state.wallet.transactionError,
    wallet: state.wallet.wallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (searchTerm) => dispatch(UsersActions.usersSearchRequest(searchTerm)),
    performTransfer: (sourceUuid, destUuid, amount) => dispatch(WalletActions.walletTransactionRequest(sourceUuid, destUuid, amount)),
    cancelSearch: () => dispatch(UsersActions.usersCancelSearch()),
    walletRequest: (ownerUuid) => dispatch(WalletActions.walletRequest(ownerUuid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformTransactionScreen)
