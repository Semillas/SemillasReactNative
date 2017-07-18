// @flow

import React, { PropTypes } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import ServiceActions from '../Redux/ServiceRedux.js'
import RoundedButton from '../Components/RoundedButton'
import ImageViewer from 'react-native-image-zoom-viewer';
import Header from '../Components/FullImageHeader';

import {
  Card,
//  CardImage,
  CardTitle,
  CardContent
} from 'react-native-card-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Images } from '../Themes/'
// Styles
import styles from './Styles/ServiceScreenStyle'
import Swiper from 'react-native-swiper'
import I18n from 'react-native-i18n'

class ServiceScreen extends React.Component {

  state: {
    showModal: boolean,
    imageIndex: number,
    fromCarousel: boolean,
  }

  static defaultProps = {
    renderHeader: () => {},
    renderFooter: () => {},
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      showModal: false,
      imageIndex: 0,
      fromCarousel: false,
    };

    (this: any)._onPressImg = this._onPressImg.bind(this);
    (this: any)._updateIndex = this._updateIndex.bind(this);
    (this: any)._closeModal = this._closeModal.bind(this);
  }


  componentWillMount () {
    const { dispatch } = this.props
    // TODO: Check if the service is not loaded.
    dispatch(ServiceActions.serviceRequest(this.props.uuid))
  }

  _onPressImg(i) {
    this.setState({
      showModal: true,
      imageIndex: i,
    });
  }

  _updateIndex(i, fromCarousel) {
    this.setState({
      imageIndex: i,
      fromCarousel,
    });
  }

  _closeModal() {
    this.setState({
      showModal: false,
    });
  }

  renderPhotos (data) {
    var photoViews
    const {showModal, imageIndex} = this.state;
    if ((data.photos) && (data.photos.length)) {
      photoViews = []
      for (var i = 0; i < data.photos.length; i++) {
        photoViews.push(
          <View key={i}>
            <TouchableWithoutFeedback
              onPress={this._onPressImg}>
               <Image
                  style={styles.picture}
                  source={{ uri: data.photos[i]['photo'] }}
                />
            </TouchableWithoutFeedback>
              </View>
        )
      }
      return (
        <View>
        <Modal
          onRequestClose={this._closeModal}
          visible={showModal}
          transparent={true}>
          <ImageViewer
            renderHeader={() => <Header onClose={() => this._closeModal()}/>}
            //onChange={this._updateIndex}
            saveToLocalByLongPress={false}
            imageUrls={data.photos.map((img) => {
              let modifyImg = img;
              if (img.photo) {
                modifyImg = Object.assign({}, img, {url: img.photo});
              }
              return modifyImg;
            })}
            //index={imageIndex}
        />
        </Modal>

        <Swiper
          width={350}
          height={300}
          showsButtons
          showsPagination
          automaticallyAdjustContentInsets>

          {photoViews}
        </Swiper>
        </View>
      )
    } else {
      return (
        <Image
          style={styles.picture}
          source={Images.servicePlaceholder}
        />
      )
    }
  }

  renderCallToAction (service) {
    if ((this.props.loggedUser) && (this.props.loggedUser.uuid === service.author.uuid)) {
      return (
        <RoundedButton
          onPress={() => {
            NavigationActions.editService({uuid: service.uuid})
          }}
        >
          {I18n.t('Edit')}
        </RoundedButton>
      )
    } else {
      return (
        <RoundedButton
          onPress={() => {
            NavigationActions.user({uuid: service.author.uuid})
          }}
        >
          {I18n.t('Get it')}
        </RoundedButton>
      )
    }
  }

  render () {
    const { service } = this.props
    if (!service) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      const card = {card: {width: 320}}
      return (
        <ScrollView style={styles.mainContainer}>
          {this.renderPhotos(service)}
          <Card styles={card}>
            <CardTitle>
              <Text style={styles.title}>{service.title}</Text>
            </CardTitle>
            <CardContent>
              <Text>{service.description}</Text>
            </CardContent>
          </Card>
          <TouchableOpacity
            onPress={() => {
              NavigationActions.user({uuid: service.author.uuid})
            }}
          >
            <View>
              <Text >Usuario: {service.author.name || service.author.email || service.author.username }</Text>
              {this.renderCallToAction(service)}
            </View>
          </TouchableOpacity>
        </ScrollView>
      )
    }
  }
}

ServiceScreen.propTypes = {
  uuid: PropTypes.string,
  requestService: PropTypes.func,
  service: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.uuid,
    service: state.services.items[ownProps.uuid],
    loggedUser: state.login.user
  }
}

export default connect(mapStateToProps)(ServiceScreen)
