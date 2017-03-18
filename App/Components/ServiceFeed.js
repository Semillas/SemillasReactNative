import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import I18n from 'react-native-i18n'
import { Colors, Metrics } from '../Themes/'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';

import Button from 'react-native-button';
import { StyleSheet } from 'react-native'

export default class ServiceFeed extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
  }

  render () {
    const { data } = this.props
    return (
      <View >

      <Card>
              <CardTitle>
                <Text style={styles.title}>Card Title</Text>
              </CardTitle>
              <CardContent>
                <Text>Content</Text>
              </CardContent>
              <CardAction >
                <Button
                  style={styles.button}
                  onPress={() => {}}>
                  Button 1
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => {}}>
                  Button 2
                </Button>
              </CardAction>
            </Card>

        <Text>{data.uuid}</Text>
        <Text>{data.title}</Text>
        <Text>{data.title}</Text>
        <Text>{data.title}</Text>
      </View >
    )
  }
}



const styles = StyleSheet.create({
    title: {
          fontSize: 38,
          backgroundColor: 'transparent'
        },
    button: {
          marginRight: 10
        }
});

