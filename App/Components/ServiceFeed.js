import React from 'react'
import {
  StyleSheet,
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
import { Colors, Images } from '../Themes/'
import { Actions as NavigationActions } from 'react-native-router-flux'

export default class ServiceFeed extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  renderPhotos(data) {
    if (data.photos.length) {
      return (
        <Image
          style={{width: 300, height: 200}}
          source={{ uri: data.photos[0]['photo'] }}
        />
      )
    } else {
      return (
        <Image
          style={{width: 300, height: 200}}
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
          {this.renderPhotos(data)}
          <Card styles={card}>
            <CardImage>
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

const styles = StyleSheet.create({
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
  }
})
