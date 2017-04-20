// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

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

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
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
          />
          <DrawerButton text='Añadir Servicio' onPress={this.handlePressNewService} />
          <DrawerButton text='Servicios' onPress={this.handlePressFeed} />
          <DrawerButton text={this.walletButtonText()} onPress={this.handlePressCurrency} />
          <DrawerButton text='Logout' onPress={this.props.logout} />
        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <Image source={Images.logo} style={styles.logo} />
          <DrawerButton text='Servicios' onPress={this.handlePressFeed} />
          <DrawerButton text='Login' onPress={this.handlePressLogin} />
          <DrawerButton text='Registro' onPress={this.handlePressLogin} />
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
  drawer: React.PropTypes.object,
  user: React.PropTypes.object,
  logout: React.PropTypes.func
}

export default DrawerContent
