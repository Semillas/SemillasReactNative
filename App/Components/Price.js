import React from 'react'
import PropTypes from 'prop-types'
import AppConfig from '../Config/AppConfig'
import { View, Image, Animated, TouchableOpacity } from 'react-native'
import { Images, Colors } from '../Themes'
import Styles from './Styles/PriceStyle'
import {
  Text,
} from "native-base";

import { Actions } from 'react-native-router-flux'


export default class Price extends React.Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render () {
    if (this.props.data.seeds_price) {
      return (<Text style={Styles.price}>{this.props.data.seeds_price} {AppConfig.CurrencyName}</Text>)
    } else {
      return (<Text />)
    }
  }
}
