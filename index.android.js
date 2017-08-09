// @flow

import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import { Sentry } from 'react-native-sentry';

Sentry.config('https://2d3dcdcb83e04977ba15535574bb87d5:903189fa421f415f8b7f5f3ee0780473@sentry.io/197460').install();

AppRegistry.registerComponent('SemillasReactNative', () => App)
