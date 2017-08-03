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
import UsersActions from '../Redux/UsersRedux'
import I18n from 'react-native-i18n'
import ImagePicker from 'react-native-image-picker'

class ProfilePhotoUploader extends React.Component {

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
        this.props.attemptPhotoPost(source, this.props.user.uuid)
      }
    })
  }

  renderUploadingStatus () {
    if (this.props.postingPhoto === true) {
      return <ActivityIndicator />
    } else if (this.props.photoPostError === true) {
      return (<Text>{I18n.t('There was a problem with the upload, Retry.')}</Text>)
    } else if (this.props.user.picture){
      return (<Image style={styles.avatar} source={{uri: this.props.user.picture}} />)
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
    return (
      <View style={styles.container}>
        {this.renderNewPhotoUploader()}
      </View>
    )
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

ProfilePhotoUploader.propTypes = {
  attemptPhotoPost: PropTypes.func,
  user: PropTypes.object,
  currentPhotoUpload: PropTypes.object,
  postingPhoto: PropTypes.bool,
  photoPostError: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user,
    postingPhoto: state.users.photoPosting,
    photoPostError: state.users.photoPostError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPhotoPost:
      (photoUrl, uuid) => dispatch(
        UsersActions.profilePhotoPostRequest(
          photoUrl,
          uuid
        )
      ),
    // servicePhotoClear: () => dispatch(ServiceActions.servicePhotoClear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotoUploader)
