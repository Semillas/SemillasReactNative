import React from 'react'
import PropTypes from 'prop-types';
import {
  View,
  TouchableHighlight,
  Image
} from 'react-native'
import {
  Container,
  Card,
  CardItem,
  Title,
  Text,
  Left,
  Right,
  Button,
  H2,
  Body
} from 'native-base'
import { Images } from '../Themes/'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './Styles/ServiceFeedStyles'
import Price from '../Components/Price'

export default class ServiceFeed extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
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

  renderDistance (data) {
    if ((data.distance == 0) || (data.distance)) {
      return (<Text style={styles.distance}>{data.distance} km</Text>)
    } else {
      return (<Text />)
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
            <Card style={{justifyContent: 'center',flex: 0}}>
              <CardItem>
                {this.renderPhotos(data)}
              </CardItem>
              <CardItem>
                <H2>{data.title}</H2>
              </CardItem>
              <CardItem>
                <Left>
                  <Price data={data} />
                </Left>
                <Right>
                  {this.renderDistance(data)}
                </Right>
              </CardItem>
            </Card>
        </TouchableHighlight>
    )
  }
}
