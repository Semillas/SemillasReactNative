// @flow

import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
      marginBottom: Metrics.baseMargin,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      borderTopColor: Colors.frost,
      // borderTopWidth: 0.5,
      borderBottomColor: Colors.frost,
      borderBottomWidth: 1,
      alignItems: 'center'
    },
    sectionText: {
      color: Colors.cta,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    subtitle: {
      color: Colors.cta,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    sectionTitle: {
      ...Fonts.style.h4,
      color: Colors.coal,
      backgroundColor: Colors.ricePaper,
      padding: Metrics.smallMargin,
      marginTop: Metrics.smallMargin,
      marginHorizontal: Metrics.baseMargin,
      alignItems: 'center',
      textAlign: 'center'
      }

  },
  darkLabelContainer: {
    backgroundColor: Colors.cloud,
    padding: Metrics.smallMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
}

export default ApplicationStyles
