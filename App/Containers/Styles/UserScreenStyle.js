// @flow

import { StyleSheet, PixelRatio } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({

  mapSection: {
    height: 250,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    height: 250,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    alignSelf: 'center',
    height: 150
  },
  section: {
    alignSelf: 'center',
    marginTop: 50
  },
  subSectionText: {
    ...Fonts.style.h5,
    color: Colors.cta,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    alignItems: 'center',
    textAlign: 'center'
    },
  ...ApplicationStyles.screen
})
