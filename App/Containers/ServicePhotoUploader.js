import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import ServiceActions from '../Redux/ServiceRedux'

import ImagePicker from 'react-native-image-picker';


class ServicePhotoUploader extends React.Component {

  state = {
    avatarSource: null,
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // Display the image and start upload
        this.props.attemptPhotoPost(source, this.props.service.uuid)

        //this.setState({
        //  avatarSource: source
        //});
        //
        //call request reducer
        // 1 put the image throught a reducer



        // 2 upload the image
        // 3 put the spinner and report status
        // 4 Add delete button

      }
    });
  }


  componentWillUnmount() {
    this.props.servicePhotoClear()
  }

//	upload (photo) {
//		// create api.
//		const api = create({
//			baseURL: 'http://localhost:3000',
//		})
//
//		// create formdata
//		const data = new FormData();
//
//				data.append('name', 'testName');
//				photos.forEach((photo, index) => {
//					data.append('photos', {
//						uri: photo.uri,
//						type: 'image/jpeg',
//						name: 'image'+index
//					});
//				});
//
//		// post your data.
//		api.post('/array', data, {
//					onUploadProgress: (e) => {
//						console.log(e)
//						const progress = e.loaded / e.total;
//						console.log(progress);
//						this.setState({
//							progress: progress
//						});
//					}
//				})
//					.then((res) => console.log(res))
//
//		// if you want to add DonwloadProgress, use onDownloadProgress
//		onDownloadProgress: (e) => {
//			const progress = e.loaded / e.total;
//		}
//	}

	renderCurrentPhotos (service) {


	}


  renderUploadingStatus () {
    if (this.props.currentPhotoUpload === null) {
      return (<Text>Select a Photo</Text>)
    } else if (this.props.postingPhoto === true) {
      return <ActivityIndicator />
    } else if (this.props.photoPostError === true){
      return (<Text>There was a problem with the upload, Retry.</Text>)
    } else {
      return (<Image style={styles.avatar} source={this.props.currentPhotoUpload} />)
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

  render(service) {
    return (
      <View style={styles.container}>
      {this.renderNewPhotoUploader()}

      </View>
    );
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
});



ServicePhotoUploader.propTypes = {
  attemptPhotoPost: PropTypes.func,
  service: PropTypes.object,
  currentPhotoUpload: PropTypes.object,
  postingPhoto: PropTypes.bool,
  photoPostError: PropTypes.bool
}


const mapStateToProps = (state, ownProps) => {
  return {
    service: ownProps.service,
    currentPhotoUpload: state.services.currentPhotoUpload,
    postingPhoto: state.services.postingPhoto,
    photoPostError: state.services.photoPostError
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    attemptPhotoPost:
      (photoUrl, serviceUuid) => dispatch(
        ServiceActions.servicePhotoPostRequest(
          photoUrl,
          serviceUuid
        )
      ),
    servicePhotoClear: () => dispatch(ServiceActions.servicePhotoClear())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServicePhotoUploader)
