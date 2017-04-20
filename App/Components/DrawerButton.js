// @flow

import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './Styles/DrawerButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'

// Example
ExamplesRegistry.add('Drawer Button', () =>
  <DrawerButton
    text='Example left drawer button'
    onPress={() => window.alert('Your drawers are showing')}
  />
)

type DrawerButtonProps = {
  text: string,
  icon: string,
  onPress: () => void
}



class DrawerButton extends Component {
  props: DrawerButtonProps
  renderIcon (props) {
    var icon;
    if ('icon' in props) {
      icon = props.icon
    } else {
      icon = 'eercast'
    }
    return (
           <Icon name={icon} size={Metrics.icons.small} color={Colors.cta} style={{marginVertical: 2}} />
    )
  }


  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.button}>
          {this.renderIcon(this.props)}
          <Text style={styles.text}>{this.props.text}</Text>
        </View >
      </TouchableOpacity>
    )
  }
}

export default DrawerButton
