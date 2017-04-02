// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({

  mapSection: {
        height: 350,
        width: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //...StyleSheet.absoluteFillObject,
      },
  map: {
    height: 300,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  ...ApplicationStyles.screen

})
