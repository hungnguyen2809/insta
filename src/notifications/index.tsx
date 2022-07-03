import React, { useEffect } from 'react';
import { logger } from 'src/utils';
import fcmService from './FCMService';
import notifiService from './NotificationService';

const NotificationProvider: React.FC = () => {
  useEffect(() => {
    fcmService.onRegisterAppWithFCM();
    fcmService.onRegister(onRegister, onNotification, onOpenNotification);
    notifiService.configure(onOpenNotification, onAction);

    return () => {
      fcmService.unregister();
      notifiService.unregister();
    };
  }, []);

  const onRegister = (token: string, tokenRefresh: boolean) => {
    logger.log('onRegister Token: ', tokenRefresh, token);
  };

  const onNotification = (noti: any) => {
    logger.log('onNotification: ', noti);

    const title = noti?.notification?.title;
    const message = noti?.notification?.body;
    const options = {
      playSound: true,
      soundName: 'default',
    };
    notifiService.showNotification(title, message, noti, options);
  };

  const onAction = (noti: any) => {
    logger.log('onAction: ', noti);
  };

  const onOpenNotification = (noti: any) => {
    logger.log('onOpenNotification: ', noti);
  };

  return <React.Fragment />;
};

export default NotificationProvider;
