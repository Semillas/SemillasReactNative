// @flow

import { StyleSheet, PixelRatio } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({

  fieldTitle: {
    color: Colors.charcoal,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  fieldValue: {
    ...Fonts.style.normal,
    color: Colors.cta,
    backgroundColor: Colors.ricePaper,
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    alignItems: 'center',
    textAlign: 'center'
  },
  ...ApplicationStyles.screen
})
