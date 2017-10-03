// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Metrics.navBarHeight,
    marginBottom: 0,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 38,
  },

  picture: {
    width: 320,
    height: 280,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: Metrics.smallMargin
  },
  price: {
    color: Colors.cta,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  ...ApplicationStyles.screen
})
