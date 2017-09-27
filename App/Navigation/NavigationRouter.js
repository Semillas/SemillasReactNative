// @flow

import React, { Component } from 'react'
import { Scene, Router, Actions, Drawer } from 'react-native-router-flux'
import PropTypes from 'prop-types';
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import CustomNavBar from '../Navigation/CustomNavBar'
import { StyleProvider, variables } from 'native-base'
import { actions } from 'react-native-navigation-redux-helpers';
import { BackAndroid, StatusBar, NavigationExperimental, Platform } from 'react-native';
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
    themeState: PropTypes.string,
    navigation: PropTypes.shape({
      key: PropTypes.string,
      routes: PropTypes.array,
    }),
}

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  popRoute() {
    this.props.popRoute();
  }

  render () {
    //const refreshOnBack = () => { Actions.pop({ refresh: {} }) }
    return (
      <Router>
        <Scene key="root">
          <Drawer key="app" contentComponent={DrawerMenu} hideNavBar type="reset">
            <Scene initial key='FeedScreen' component={FeedScreen} title='Feed' navBar={CustomNavBar} />
					</Drawer>
            <Scene key='service' component={ServiceScreen} title='Service' hideNavBar />
        </Scene>
      </Router>

//      <Router>
//        <Scene key='drawer' component={NavigationDrawer} open={false}>
//          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
//            <Scene initial key='feed' component={FeedScreen} title='Feed' navBar={CustomNavBar} />
//            <Scene key='user' component={UserScreen} title='User' />
//            <Scene key='service' component={ServiceScreen} title='Service' />
//            <Scene key='profile' component={ProfileScreen} title='Perfil' />
//            <Scene key='editService' component={EditServiceScreen} title='Service' onBack={refreshOnBack} />
//            <Scene key='editProfile' component={EditProfileScreen} title='Perfil' onBack={refreshOnBack} />
//            <Scene key='currency' component={CurrencyScreen} title='Semillas' />
//            <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
//            <Scene key='signup' component={SignupScreen} title='signup' hideNavBar />
//            <Scene key='about' component={AboutScreen} title='about' />
//
//            {/* Custom navigation bar example */}
//          </Scene>
//        </Scene>
//      </Router>
    )
  }
}

export default NavigationRouter
