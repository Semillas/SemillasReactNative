// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
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

  ...ApplicationStyles.screen
})
