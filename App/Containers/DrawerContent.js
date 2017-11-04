// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import AppConfig from '../Config/AppConfig'
import styles from './Styles/DrawerContentStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import LoginActions from '../Redux/LoginRedux'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'

class DrawerContent extends Component {

  handlePressFeed = () => {
    NavigationActions.reset('FeedScreen')
  }

  handlePressLogin= () => {
    NavigationActions.drawerClose()
    NavigationActions.login()
  }

  handlePressSignup= () => {
    NavigationActions.drawerClose()
    NavigationActions.signup()
  }

  handlePressCurrency= () => {
    NavigationActions.drawerClose()
    NavigationActions.currency()
  }

  handlePressProfile= () => {
    NavigationActions.drawerClose()
    NavigationActions.profile()
  }

  handlePressNewService= () => {
    NavigationActions.drawerClose()
    NavigationActions.editService()
  }

  walletButtonText () {
    if (this.props.wallet) {
      return AppConfig.CurrencyName + ' (' + String(this.props.wallet.balance) + ')'
    } else {
      return AppConfig.CurrencyName
    }
  }

  pressLogout = () => {
    this.props.logout()
    NavigationActions.drawerClose()
  }

  // <DrawerButton text={I18n.t('Services')} icon='envira' onPress={this.handlePressFeed} />
  render () {
    if (this.props.user) {
      return (
        <ScrollView style={styles.container}>
          <Image source={Images.logo} style={styles.logo} />
          <DrawerButton
            text={this.props.user.name ? this.props.user.name : this.props.user.username}
            onPress={this.handlePressProfile}
            icon='user'
          />
          <DrawerButton text={I18n.t('Add Service')} icon='plus-circle' onPress={this.handlePressNewService} />
          <DrawerButton text={this.walletButtonText()} icon='money' onPress={this.handlePressCurrency} />
          <DrawerButton text={I18n.t('Logout')} icon='sign-out' onPress={() => this.pressLogout(this)} />
        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <Image source={Images.logo} style={styles.logo} />
          <DrawerButton text={I18n.t('Login')} icon='sign-in' onPress={this.handlePressLogin} />
          <DrawerButton text={I18n.t('Sign Up')} icon='hand-o-right' onPress={this.handlePressSignup} />
        </ScrollView>
      )
    }
  }
}

DrawerContent.propTypes = {
  user: PropTypes.object,
  wallet: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    wallet: state.wallet.wallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
