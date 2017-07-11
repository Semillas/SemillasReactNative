import React from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native'
import {
  Card,
  CardImage,
  CardTitle,
  CardContent
} from 'react-native-card-view'
import { Images } from '../Themes/'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './Styles/ServiceFeedStyles'

export default class ServiceFeed extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  renderPhotos (data) {
    if (data.photos.length) {
      return (
        <Image
          style={styles.image}
          source={{ uri: data.photos[0]['photo'] }}
        />
      )
    } else {
      return (
        <Image
          style={styles.image}
          source={Images.servicePlaceholder}
        />
      )
    }
  }

  render () {
    const { data } = this.props
    const card = {card: {width: 320}}
    return (
      <TouchableHighlight
        onPress={() => {
          NavigationActions.service({uuid: data.uuid})
        }}
      >
        <View style={styles.container}>
          <Card styles={card}>
            <CardImage>
              {this.renderPhotos(data)}
            </CardImage>
            <CardTitle>
              <Text style={styles.title}>{data.title}</Text>
            </CardTitle>
            <CardContent>
              <Text>{data.description}</Text>
            </CardContent>
          </Card>
        </View >
      </TouchableHighlight>
    )
  }
}
