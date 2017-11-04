// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  thisContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  currencyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },


  cta: {
    marginBottom: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
  },

  movement: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  red: {
    color: 'red'
  },

  ...ApplicationStyles.screen
})
