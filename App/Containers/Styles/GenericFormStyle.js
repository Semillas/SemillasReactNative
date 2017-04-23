// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
    button: {
          backgroundColor: Colors.cta,
          color: 'white',
          lineHeight: 30,
          marginTop: 10,
          textAlign: 'center',
          width: 250,
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 15,
          marginTop: 25,
          padding: 5
        },
    container: {
        marginTop: 30,
        padding: 45

        },
    input: {
          borderColor: 'black',
          borderWidth: 1,
          height: 37,
          width: 250,
          padding: 5
        },
    valid: {
          borderColor: '#53E69D'
        },
    invalid: {
          borderColor: '#F55E64'
    }
})
