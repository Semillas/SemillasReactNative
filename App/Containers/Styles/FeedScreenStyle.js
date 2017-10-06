// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  feedContainer: {
      flex: 1,
      marginTop: Metrics.navBarHeight,
      marginRight: Metrics.baseMargin,
      marginLef: Metrics.baseMargin,

      backgroundColor: Colors.transparent

  }
})
