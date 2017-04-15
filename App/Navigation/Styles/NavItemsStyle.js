// @flow

import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../Themes/'

const navButton = {
  backgroundColor: Colors.transparent,
  justifyContent: 'center'
}

export default StyleSheet.create({
  hamburgerButton: {
    ...navButton,
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    alignItems: 'center'
  },
  searchButton: {
    ...navButton,
    marginTop: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    alignItems: 'center'
  }
})
