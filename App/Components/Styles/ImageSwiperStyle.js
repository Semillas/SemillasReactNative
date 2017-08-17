// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  picture: {
    width: Metrics.screenWidth,
    height: 280,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: Metrics.smallMargin
  }
})
