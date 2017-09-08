// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight + Metrics.baseMargin,
    marginRight: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    marginLeft: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow

  },
  item: {
    fontSize: 18,
  },

  selectedCategory: {
    color: Colors.cta,
  }

})
