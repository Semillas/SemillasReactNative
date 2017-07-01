// @flow

import { Metrics, Colors, Fonts } from '../../Themes'

export default {
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: Colors.background,
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
  image: {
    marginTop: Metrics.smallMargin,
    width: 300,
    height: 200
  },
  distance: {
    alignItems: 'center',
    color: Colors.charcoal
  }
}
