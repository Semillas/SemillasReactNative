// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  webView: {
    marginTop: Metrics.navBarHeight
  },

  ...ApplicationStyles.screen
})
