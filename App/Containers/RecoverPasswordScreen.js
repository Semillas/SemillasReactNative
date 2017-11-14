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
import UsersActions from '../Redux/UsersRedux'
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
  Body,
  Label
} from 'native-base'
import CommonHeader from '../Components/CommonHeader'
import I18n from 'react-native-i18n'
import ServicePhotos from './ServicePhotoUploader'

RecoverPasswordProps = {
  posting: PropTypes.bool,
  message: PropTypes.string,
  passwordRecoveryResult: PropTypes.func,
}

class RecoverPasswordScreen extends React.Component {
  props: RecoverPasswordProps

  state: {
    email: string,
  }


  constructor (props: RecoverPasswordProps) {
    super(props)
    this.state = {
      email: '',
    }
  }

  handlePressPost = () => {
    this.props.attemptRecoverPassword(this.state.email)
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
                keyboardType='email-address'
                returnKeyType='next'
                autoCapitalize='sentences'
                autoCorrect={false}
                onChangeText={this.handleChangeEmail}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.description.focus()}
                />
              </Item>
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.email) ? this.props.error['email'][0] : ''}
              </Text>
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.non_field_errors) ? this.props.error['non_field_errors'][0] : ''}
              </Text>


            </Form>
            <Button
              block
              onPress={this.handlePressPost}
              >
                <Text>Send</Text>
            </Button>
            <CardItem>
              <Body>
                <Text> {this.props.successMessage} </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posting: state.users.posting,
    successMessage: state.users.passwordRecoverySuccess,
    error: state.users.passwordRecoveryError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRecoverPassword:
      (email) => dispatch(
        UsersActions.passwordRecoveryRequest(
          email
        )
      ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordScreen)
