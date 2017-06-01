// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  },
  picture: {
    width: 320,
    height: 280,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: Metrics.smallMargin

  },


  ...ApplicationStyles.screen
})
