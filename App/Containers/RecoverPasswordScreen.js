// @flow

import React from 'react'
import {
  TouchableOpacity,
  Image,
  Keyboard,
  Picker,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Styles from './Styles/EditServiceFormStyle'
import {Images, Metrics} from '../Themes'
import ServiceActions from '../Redux/ServiceRedux'
import CategoryActions from '../Redux/CategoryRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import {
  Content,
  Container,
  Card,
  CardItem,
  Input,
  Button,
  Text,
  Form,
  Item,
  Label
} from 'native-base'
import CommonHeader from '../Components/CommonHeader'
import I18n from 'react-native-i18n'
import ServicePhotos from './ServicePhotoUploader'

ServicePostProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.bool,
  attemptServicePost: PropTypes.func,
  profile: PropTypes.object,
  categories: PropTypes.object
}

class EditServiceForm extends React.Component {
  props: ServicePostProps

  state: {
    email: string,
  }


  constructor (props: ServicePostProps) {
    super(props)
    this.state = {
      email: '',
    }
  }

  handlePressPost = () => {
    if (this.props.uuid) {
      this.props.attemptServiceDelete(this.props.uuid)
    } else if (this.props.newService) {
      this.props.attemptServiceDelete(this.props.newService)
    }
    NavigationActions.feed()
  }

  handleChangeEmail= (text) => {
    this.setState({ email: text })
  }

  render () {
    const { email } = this.state
    return (

      <Container>
        <CommonHeader title={I18n.t('Service')} />
        <Content padder>
          <Card>
            <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
            <Form>
              <Item floatingLabel>
                <Label>{I18n.t('email')}</Label>
                <Input
                ref='email'
                value={email}
                keyboardType='email'
                returnKeyType='next'
                autoCapitalize='sentences'
                autoCorrect={false}
                onChangeText={this.handleChangeTitle}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.description.focus()}
                />
              </Item>
                <Text style={Styles.errorLabel}>
                  { (this.props.error && this.props.error.title) ? this.props.error['title'][0] : ''}
                </Text>

            </Form>
            <Button
              block
              onPress={this.handlePressPost}
              >
                <Text>Send</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posting: state.services.posting,
    error: state.services.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRecoverEmail:
      (email) => dispatch(
        UsersActions.servicePostRequest(
          email
        )
      ),
    attemptServiceDelete:
      (uuid) => dispatch(ServiceActions.serviceDeletionRequest(uuid)),
    retrieveService: (uuid) => dispatch(ServiceActions.serviceRequest(uuid)),
    retrieveCategories: () => dispatch(CategoryActions.categoryRequest()),
    clearNewService: () => dispatch(ServiceActions.clearNewService())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceForm)
