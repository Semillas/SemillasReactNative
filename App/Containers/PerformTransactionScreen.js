// @flow

import React from 'react'
import { TouchableOpacity, View } from 'react-native'
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
  Body,
  Thumbnail
} from 'native-base'
import CommonHeader from '../Components/CommonHeader'
import AppConfig from '../Config/AppConfig'
import I18n from 'react-native-i18n'
// external libs
// Styles
import styles from './Styles/PerformTransactionScreenStyle'

import SearchBar from '../Components/SearchBar'
import UsersActions from '../Redux/UsersRedux'

class PerformTransactionScreen extends React.Component {

  constructor () {
    super()
    this.state = {
      amount: 0.0,
      recipient: null
    }
  }

  cancelSearch = () => {
    this.props.cancelSearch()
    this.state.recipient = null
  }

  onSearch = (searchTerm) => {
    this.props.performSearch(searchTerm)
  }

  setRecipient(recipient) {
    this.state.recipient = recipient
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


  render () {
    return (
      <Container>
        <CommonHeader title={I18n.t('Transfer') + ' ' + AppConfig.CurrencyName} />
        <Container style={styles.container}>
          <Content padder>
            <H2>
              {this.props.user.wallet.balance + ' ' + AppConfig.CurrencyName + ' ' + I18n.t('in your wallet')}
            </H2>
            <H3 style={{paddingTop:20}}>
              {I18n.t('Choose recipient:')}
            </H3>
            <Text note>{I18n.t('Can search by name, full email, full phone (with +prefix) or Telegram Id')}</Text>

            <SearchBar onSearch={this.onSearch} searchTerm={this.props.searchTerm} onCancel={this.cancelSearch} />
            { (this.props.searching) ? <Spinner /> : <View />}
            {this.renderSearchResults()}

            <H2 style={{paddingTop:20}}>
              {I18n.t('Recipient: ')}
            </H2>
            {this.renderRecipient()}



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
    searching: state.users.searching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (searchTerm) => dispatch(UsersActions.usersSearchRequest(searchTerm)),
    cancelSearch: () => dispatch(UsersActions.usersCancelSearch()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformTransactionScreen)
