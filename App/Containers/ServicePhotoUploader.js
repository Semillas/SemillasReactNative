import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native'
import ServiceActions from '../Redux/ServiceRedux'
import I18n from 'react-native-i18n'
import ImagePicker from 'react-native-image-picker'

class ServicePhotoUploader extends React.Component {

  state = {
    avatarSource: null
  }

  selectPhotoTapped () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }
        // Display the image and start upload
        this.props.attemptPhotoPost(source, this.props.service.uuid)
      }
    })
  }

  componentWillUnmount () {
    this.props.servicePhotoClear()
  }

  renderCurrentPhotos () {
    handlePressDeletePhoto = () => {
      console.log('Delete Service Photo.')
      this.props.attemptPhotoDelete()
    }
    return (
      <View >
        { this.props.service.photos.map(function (object, i) {
          return (
            <View key={i}>
              <Image style={styles.avatar} source={{uri: object.photo}} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePressDeletePhoto()}>
                <Text
                  // style={Styles.buttonText}
                  >
                  {I18n.t('Delete Photo')}
                </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }

  renderUploadingStatus () {
    if (this.props.postingPhoto === true) {
      return <ActivityIndicator />
    } else if (this.props.photoPostError === true) {
      return (<Text>{I18n.t('There was a problem with the upload, Retry.')}</Text>)
    } else {
      return (<Text>{I18n.t('Select a Photo')}</Text>)
    }
  }

  renderNewPhotoUploader () {
    return (
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.renderUploadingStatus() }
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    if (this.props.service) {
      return (
        <View style={styles.container}>
          {this.renderCurrentPhotos()}
          {this.renderNewPhotoUploader()}
        </View>
      )
    } else {
      return (<View />)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
})

ServicePhotoUploader.propTypes = {
  attemptPhotoPost: PropTypes.func,
  service: PropTypes.object,
  currentPhotoUpload: PropTypes.object,
  postingPhoto: PropTypes.bool,
  photoPostError: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  return {
    service: state.services.items[ownProps.serviceUuid],
    postingPhoto: state.services.postingPhoto,
    photoPostError: state.services.photoPostError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPhotoPost:
      (photoUrl, serviceUuid) => dispatch(
        ServiceActions.servicePhotoPostRequest(
                    serviceUuid
        )
      ),
    attemptPhotoDelete:
      (photoId) => dispatch(
        ServiceActions.servicePhotoDeletionRequest(
                    photoId
        )
      ),
    servicePhotoClear: () => dispatch(ServiceActions.servicePhotoClear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePhotoUploader)
