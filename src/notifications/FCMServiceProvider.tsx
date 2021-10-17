/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View } from 'react-native';
import fcmService from './FCMService';
import NotifiManager from './NotificationManager';

export class FCMServiceProvider extends Component {
  componentDidMount() {
    fcmService.registerAppWithFCM();
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification);
  }

  componentWillUnmount() {
    fcmService.unRegister();
    NotifiManager.unRegister();
  }

  onRegister = (_token: any) => {
    // console.log('[FCMServiceProvider] onRegister token: ', _token);
  };

  onNotification = (notify: any) => {
    // console.log('[FCMServiceProvider] onNotification: ', notify);
    NotifiManager.showNotification(notify.title, notify.body, notify);
  };

  onOpenNotification = (notify: any) => {
    // console.log('[FCMServiceProvider] onOpenNotification: ', notify);
    NotifiManager.onOpenNotification(notify);
  };

  render() {
    return <View style={{ width: 0 }} />;
  }
}
