// @flow

import React, { Component } from 'react'
import { Scene, Router, Actions, Drawer } from 'react-native-router-flux'
import PropTypes from 'prop-types';
import Styles from './Styles/NavigationContainerStyle'
import CustomNavBar from '../Navigation/CustomNavBar'
import { StyleProvider, variables } from 'native-base'
import { actions } from 'react-native-navigation-redux-helpers';
import { BackHandler, StatusBar, NavigationExperimental, Platform } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux';


// screens identified by the router
import FeedScreen from '../Containers/FeedScreen'
import UserScreen from '../Containers/UserScreen'
import ServiceScreen from '../Containers/ServiceScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import EditServiceScreen from '../Containers/EditServiceScreen'
import EditProfileScreen from '../Containers/EditProfileScreen'
import CurrencyScreen from '../Containers/CurrencyScreen'
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'
import AboutScreen from '../Containers/AboutScreen'
import HowItWorksScreen from '../Containers/HowItWorksScreen'
import RecoverPasswordScreen from '../Containers/RecoverPasswordScreen'
import PerformTransactionScreen from '../Containers/PerformTransactionScreen'
import DrawerMenu from './DrawerMenu'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/


const {
    popRoute,
} = actions;

const RouterWithRedux = connect()(Router);



class NavigationRouter extends Component {

  static propTypes = {
    drawerState: PropTypes.string,
    popRoute: PropTypes.func,
    navigation: PropTypes.shape({
      key: PropTypes.string,
      routes: PropTypes.array,
    }),
}

  popRoute() {
    this.props.popRoute();
  }

  render () {
    const refreshOnBack = () => { Actions.pop({ refresh: {} }) }
    return (
      <Router>
        <Scene key="root">
          <Drawer key="app" contentComponent={DrawerMenu} hideNavBar type="reset">
            <Scene initial key='FeedScreen' component={FeedScreen} navBar={CustomNavBar} />
					</Drawer>
            <Scene key='service' component={ServiceScreen} hideNavBar />
            <Scene key='FeedScreen' component={FeedScreen} navBar={CustomNavBar} />
            <scene key='user' component={UserScreen} title='user' hideNavBar/>
            <scene key='profile' component={ProfileScreen} title='perfil' hideNavBar/>
            <scene key='editService' component={EditServiceScreen} title='service' onback={refreshOnBack} hideNavBar />
            <scene key='editProfile' component={EditProfileScreen} title='perfil' onback={refreshOnBack} hideNavBar />
            <scene key='currency' component={CurrencyScreen} title='semillas' hideNavBar />
            <scene key='login' component={LoginScreen} hideNavBar title='login' />
            <scene key='signup' component={SignupScreen} title='signup' hideNavBar />
            <scene key='recoverPassword' component={RecoverPasswordScreen} title='Recover Password' hideNavBar/>
            <scene key='about' component={AboutScreen} title='about' hideNavBar />
            <scene key='howItWorks' component={HowItWorksScreen} title='howItWorks' hideNavBar />
            <scene key='performTransaction' component={PerformTransactionScreen} title='performTransaction' hideNavBar/>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
