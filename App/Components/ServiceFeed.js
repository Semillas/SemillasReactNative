import React from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
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
    const card  = {card: {width: 320}};
    return (
      <View style={styles.container}>

      <Card styles={card}>
              <CardImage>
                <Image
                  style={{width: 300, height: 200}}
                  source={{ uri: data.photos[0]["photo"] }}
                />
              </CardImage>
              <CardTitle>
                <Text style={styles.title}>{data.title}</Text>
              </CardTitle>
              <CardContent>
                <Text>{data.description}</Text>
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

     </View >
    )
  }
}



const styles = StyleSheet.create({
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
});

