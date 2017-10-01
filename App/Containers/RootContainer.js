// @flow

import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Root } from "native-base";
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import LoginActions from '../Redux/LoginRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  componentWillReceiveProps(newProps) {
    // Add Api Key to Semillas API
    if (newProps.apiKey) {
      this.props.setApiKey(newProps.apiKey)
    }
  }
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <Root>
        <View style={styles.applicationView}>
          <StatusBar barStyle='light-content' />
          <NavigationRouter />
        </View>
      </Root>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    apiKey: state.login.key,
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  setApiKey: (key) => dispatch(LoginActions.setApiKey(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
