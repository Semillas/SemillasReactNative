// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import PropTypes from 'prop-types';
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressFeed = () => {
    this.toggleDrawer()
    NavigationActions.feed()
  }

  handlePressLogin= () => {
    this.toggleDrawer()
    NavigationActions.login()
  }

  handlePressSignup= () => {
    this.toggleDrawer()
    NavigationActions.signup()
  }

  handlePressCurrency= () => {
    this.toggleDrawer()
    NavigationActions.currency()
  }

  handlePressProfile= () => {
    this.toggleDrawer()
    NavigationActions.profile()
  }

  handlePressNewService= () => {
    this.toggleDrawer()
    NavigationActions.editService()
  }

  walletButtonText () {
    return 'Semillas (' + String(this.props.user.wallet.balance) + ')'
  }

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
          <DrawerButton text={I18n.t('Services')} icon='envira' onPress={this.handlePressFeed} />
          <DrawerButton text={this.walletButtonText()} icon='money' onPress={this.handlePressCurrency} />
          <DrawerButton text={I18n.t('Logout')} icon='sign-out' onPress={this.props.logout} />
        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <Image source={Images.logo} style={styles.logo} />
          <DrawerButton text={I18n.t('Services')} icon='envira' onPress={this.handlePressFeed} />
          <DrawerButton text={I18n.t('Login')} icon='sign-in' onPress={this.handlePressLogin} />
          <DrawerButton text={I18n.t('Sign Up')} icon='hand-o-right' onPress={this.handlePressSignup} />
          {/*
            <DrawerButton text='Component Examples' onPress={this.handlePressComponents} />
            <DrawerButton text='Usage Examples' onPress={this.handlePressUsage} />
            <DrawerButton text='API Testing' onPress={this.handlePressAPI} />
            <DrawerButton text='Themes' onPress={this.handlePressTheme} />
            <DrawerButton text='Device Info' onPress={this.handlePressDevice} />
          */}
        </ScrollView>
      )
    }
  }
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func
}

export default DrawerContent
