// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  thisContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cta: {
    marginBottom: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
  },

  ...ApplicationStyles.screen
})
