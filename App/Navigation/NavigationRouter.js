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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', NavigationActions.pop);
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
            <scene key='user' component={UserScreen} title='user' />
            <scene key='profile' component={ProfileScreen} title='perfil' />
            <scene key='editService' component={EditServiceScreen} title='service' onback={refreshOnBack} />
            <scene key='editProfile' component={EditProfileScreen} title='perfil' onback={refreshOnBack} />
            <scene key='currency' component={CurrencyScreen} title='semillas' />
            <scene key='login' component={LoginScreen} title='login' hidenavbar />
            <scene key='signup' component={SignupScreen} title='signup' hidenavbar />
            <scene key='about' component={AboutScreen} title='about' />



        </Scene>
      </Router>

//      <Router>
//        <Scene key='drawer' component={NavigationDrawer} open={false}>
//          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
//            <Scene initial key='feed' component={FeedScreen} title='Feed' navBar={CustomNavBar} />
//            <scene key='user' component={userscreen} title='user' />
//            <scene key='service' component={servicescreen} title='service' />
//            <scene key='profile' component={profilescreen} title='perfil' />
//            <scene key='editservice' component={editservicescreen} title='service' onback={refreshonback} />
//            <scene key='editprofile' component={editprofilescreen} title='perfil' onback={refreshonback} />
//            <scene key='currency' component={currencyscreen} title='semillas' />
//            <scene key='login' component={loginscreen} title='login' hidenavbar />
//            <scene key='signup' component={signupscreen} title='signup' hidenavbar />
//            <scene key='about' component={aboutscreen} title='about' />
//
//            {/* Custom navigation bar example */}
//          </Scene>
//        </Scene>
//      </Router>
    )
  }
}

export default NavigationRouter
