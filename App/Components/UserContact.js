import React from 'react'
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  Clipboard,
  Image
} from 'react-native'
import I18n from 'react-native-i18n'
import { Toast } from 'native-base';
import { Images } from '../Themes/'
import { Actions as NavigationActions } from 'react-native-router-flux'
import AppConfig from '../Config/AppConfig'
import styles from './Styles/UserContactStyle'

export default class ServiceFeed extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  openLink (url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        Toast.show({
          text: I18n.t('Copied into Clipboard'),
          position: 'bottom',
          buttonText: 'Okay'
        })
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      } }).catch(err => console.error('An error occurred', err));
  }

  copyToClipboardLink (text) {
    Toast.show({
      text: I18n.t('Copied into Clipboard'),
      position: 'bottom',
      duration: 3000,
    })
    Clipboard.setString(text)
  }

  renderContactLink(url, text) {
    return (
      <TouchableOpacity
        onPress={() => this.openLink(url)}
        onLongPress={() => this.copyToClipboardLink(text) }>
        <Text style={styles.fieldValue}>{text}</Text>
      </TouchableOpacity>
    )
  }

  renderEmail (user) {
    if (user.email) {
      url = "mailto:" + user.email
      return (
        <View>
          <Text style={styles.fieldTitle}>{I18n.t('Email')}</Text>
          {this.renderContactLink(url, user.email)}
        </View>
      )
    } else {
      return (<View />)
    }
  }

  renderPhone(user) {
    if (user.phone) {
      url = "tel:" + user.phone
      return (
        <View>
          <Text style={styles.fieldTitle}>{I18n.t('Phone')}</Text>
          {this.renderContactLink(url, user.phone)}
        </View>
      )
    } else {
      return (<View />)
    }
  }

   renderFaircoinAddress(user) {
    if ((AppConfig.FaircoinEnabled) && (user.faircoin_address)) {
      url = "faircoin:" + user.faircoin_address
      return (
        <View>
          <Text style={styles.fieldTitle}>{I18n.t('Faircoin Address')}</Text>
          {this.renderContactLink(url, user.faircoin_address)}
        </View>
      )
    } else {
      return (<View />)
    }
  }

  renderTelegramId (user) {
    if (user.telegram_id) {
      url = "tg:resolve?domain=" + user.telegram_id.substr(1)
      return (
        <View>
          <Text style={styles.fieldTitle}>Telegram Id</Text>
          {this.renderContactLink(url, user.telegram_id)}
        </View>
      )
    } else {
      return (<View />)
    }
  }

  render () {
    const { user } = this.props
    return (
      <View>
        {this.renderEmail(user)}
        {this.renderTelegramId(user)}
        {this.renderPhone(user)}
        {this.renderFaircoinAddress(user)}
      </View>
    )
  }
}
