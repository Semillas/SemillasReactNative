// @flow

import React from 'react'
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'
import styles from './Styles/ImageSwiperStyle'

import Swiper from 'react-native-swiper'
import ImageViewer from 'react-native-image-zoom-viewer';
import Header from '../Components/FullImageHeader';

type ImageSwiperProps = {
  images: Object
}

export default class ImageSwiper extends React.Component {
  props: ImageSwiperProps

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

  _onPressImg(i) {
    this.setState({
      showModal: true,
      imageIndex: i,
    });
  }

  _updateIndex(i) {
    this.swiper.scrollBy(i-this.state.imageIndex, false)
    this.setState({
      imageIndex: i,
    });
  }

  _closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    var photoViews
    const {showModal, imageIndex} = this.state;
    photoViews = this.props.images.map((item, i) =>
      <TouchableWithoutFeedback
        key={i}
        onPress={e => this._onPressImg(i)}>
         <Image
            style={styles.picture}
            source={{ uri: item['photo'] }}
          />
      </TouchableWithoutFeedback>
    )
    this.photoSwiper = (
      <Swiper
        ref={r => {
          this.swiper = r;
        }}
        width={350}
        height={300}
        showsButtons
        showsPagination
        automaticallyAdjustContentInsets>
        {photoViews}
      </Swiper>
    )
    return (
      <View>
        <Modal
          onRequestClose={this._closeModal}
          visible={showModal}
          transparent={true}>
          <ImageViewer
            renderHeader={() => <Header onClose={() => this._closeModal()}/>}
            onChange={this._updateIndex}
            saveToLocalByLongPress={false}
            imageUrls={this.props.images.map((img) => {
              let modifyImg = img;
              if (img.photo) {
                modifyImg = Object.assign({}, img, {url: img.photo});
              }
              return modifyImg;
            })}
            index={imageIndex}
        />
        </Modal>
        {this.photoSwiper}
      </View>
    )
  }
}
